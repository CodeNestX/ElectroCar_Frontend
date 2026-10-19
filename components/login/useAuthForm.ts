"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  loginWithPassword,
  normalizeDigits,
  sendOtp,
  updateMyProfile,
  verifyOtp,
  type ApiResult,
  type OtpPurpose,
  type OtpType,
} from "@/lib/auth";

/**
 * All of the login / sign-up logic lives here, so the four UI files
 * (desktop/mobile x fa/en) only render. To change how the site talks to the
 * backend, edit lib/auth.ts (requests) or this file (flow).
 *
 * Flows (they follow ElectroCar_Backend):
 *   login   -> POST /users/login
 *   signup  -> POST /otp/send (register) -> code screen -> POST /otp/verify
 *              (creates the account + sets the cookie) -> PUT /users/me (name + password)
 *   forgot  -> POST /otp/send (login)    -> code screen -> POST /otp/verify (signs in)
 */

export type AuthView = "login" | "signup" | "forgot" | "code";

export type AuthMessages = {
  invalidId: string;
  passwordShort: string;
  mismatch: string;
  agreeTerms: string;
  invalidCode: string;
  loginFailed: string;
  loginBlocked: string;
  noPassword: string;
  codeWrong: string;
  sendFailed: string;
  network: string;
  server: string;
};

type Options = {
  lang: "fa" | "en";
  /** What the user types as their login id: a mobile number (fa) or an email (en) */
  idKind: OtpType;
  messages: AuthMessages;
  /** Where to go after a successful sign-in */
  redirectTo?: string;
};

const RESEND_SECONDS = 60;
const MIN_PASSWORD = 6;

export function useAuthForm({
  lang,
  idKind,
  messages: m,
  redirectTo = "/",
}: Options) {
  const router = useRouter();

  const [view, setView] = useState<AuthView>("login");
  const [codePurpose, setCodePurpose] = useState<OtpPurpose>("register");

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");

  // NOTE: the backend cookie does not depend on "remember me" (it is always long-lived),
  // so this value is only kept for the UI. Send it to the API if you add support for it.
  const [remember, setRemember] = useState(true);
  const [agree, setAgree] = useState(true);

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const destination = normalizeDigits(id.trim());

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const isValidId = (value: string) =>
    idKind === "mobile"
      ? /^09\d{9}$/.test(value)
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Persian users see the server's own (Persian) message; English users get ours.
  const serverError = (result: ApiResult, fallback: string) => {
    if (result.status === 0) return m.network;
    if (result.status >= 500) return m.server;

    return lang === "fa" && result.message ? result.message : fallback;
  };

  const goTo = (next: AuthView) => {
    setView(next);
    setError("");
    setShowPass(false);
    setShowConfirm(false);
    setCode("");
  };

  const backFromCode = () => goTo(codePurpose === "register" ? "signup" : "forgot");

  const finish = () => {
    router.push(redirectTo);
    router.refresh();
  };

  const requestCode = async (purpose: OtpPurpose) => {
    const result = await sendOtp(destination, idKind, purpose);

    if (!result.ok) {
      setError(serverError(result, m.sendFailed));
      return false;
    }

    setCodePurpose(purpose);
    setView("code");
    setCode("");
    setCooldown(RESEND_SECONDS);
    return true;
  };

  const resend = async () => {
    if (loading || cooldown > 0) return;

    setError("");
    setLoading(true);
    const result = await sendOtp(destination, idKind, codePurpose);
    setLoading(false);

    if (!result.ok) {
      setError(serverError(result, m.sendFailed));
      return;
    }

    setCooldown(RESEND_SECONDS);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (loading) return;

    setError("");

    /* ───── Sign in with password ───── */
    if (view === "login") {
      if (!isValidId(destination)) return setError(m.invalidId);

      setLoading(true);
      const result = await loginWithPassword(destination, password);
      setLoading(false);

      if (!result.ok) {
        const fallback =
          result.status === 403
            ? m.loginBlocked
            : result.status === 400
              ? m.noPassword
              : m.loginFailed;

        return setError(serverError(result, fallback));
      }

      return finish();
    }

    /* ───── Sign up: step 1, send the code ───── */
    if (view === "signup") {
      if (!isValidId(destination)) return setError(m.invalidId);
      if (password.length < MIN_PASSWORD) return setError(m.passwordShort);
      if (password !== confirm) return setError(m.mismatch);
      if (!agree) return setError(m.agreeTerms);

      setLoading(true);
      await requestCode("register");
      setLoading(false);
      return;
    }

    /* ───── Forgot password: send a sign-in code ───── */
    if (view === "forgot") {
      if (!isValidId(destination)) return setError(m.invalidId);

      setLoading(true);
      await requestCode("login");
      setLoading(false);
      return;
    }

    /* ───── Code screen: verify ───── */
    const cleanCode = normalizeDigits(code.trim());

    if (!/^\d{6}$/.test(cleanCode)) return setError(m.invalidCode);

    setLoading(true);

    const verified = await verifyOtp(destination, cleanCode, codePurpose, idKind);

    if (!verified.ok) {
      setLoading(false);
      return setError(serverError(verified, m.codeWrong));
    }

    // The account now exists and the cookie is set. For a new account, save the name and password.
    if (codePurpose === "register") {
      const [first, ...rest] = name.trim().split(/\s+/);

      const profile = await updateMyProfile({
        first_name: first || "",
        last_name: rest.join(" "),
        password,
      });

      if (!profile.ok) {
        console.warn("Could not save the profile after sign-up:", profile.status, profile.message);
      }
    }

    setLoading(false);
    finish();
  };

  return {
    view,
    codePurpose,
    goTo,
    backFromCode,

    name,
    setName,
    id,
    setId,
    password,
    setPassword,
    confirm,
    setConfirm,
    code,
    setCode,
    remember,
    setRemember,
    agree,
    setAgree,
    showPass,
    setShowPass,
    showConfirm,
    setShowConfirm,

    destination,
    loading,
    error,
    cooldown,
    resend,
    handleSubmit,
  };
}
