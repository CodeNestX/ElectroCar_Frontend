"use client";

import { useAuthForm } from "./useAuthForm";

// Mobile layout, Persian. Rendering only: all logic is in ./useAuthForm.ts (API calls in @/lib/auth).
const t = {
  "welcomeA": "به دنیای",
  "welcomeB": "خودروهای برقی خوش آمدید!",
  "name": "نام و نام خانوادگی",
  "namePh": "نام و نام خانوادگی",
  "id": "شماره تماس",
  "idPh": "09123456789",
  "password": "رمز عبور",
  "passwordPhLogin": "رمز عبور خود را وارد کنید",
  "passwordPhSignup": "رمز عبور",
  "confirm": "تکرار رمز عبور",
  "confirmPh": "تکرار رمز عبور",
  "remember": "مرا به خاطر بسپار",
  "forgotLink": "رمز عبور را فراموش کرده‌اید؟",
  "terms": "قوانین و مقررات را می‌پذیرم",
  "show": "نمایش رمز عبور",
  "hide": "پنهان کردن رمز عبور",
  "codeLabel": "کد تأیید",
  "resend": "ارسال مجدد کد",
  "resendIn": "ارسال مجدد کد تا {s} ثانیه دیگر",
  "changeId": "تغییر شماره",
  "copyright": "© 2026 ElectroCar — آینده تحرک از اینجا شروع می‌شود.",
  "login": {
    "title": "ورود به ElectroCar",
    "subtitle": "به حساب کاربری خود وارد شوید",
    "sideA": "اخبار، بررسی‌ها و فناوری فردا",
    "sideB": "دنیای خودروهای برقی را با ElectroCar بشناسید.",
    "button": "ورود به حساب",
    "switchText": "هنوز حساب ندارید؟",
    "switchLink": "ثبت‌نام کنید",
    "switchTo": "signup"
  },
  "signup": {
    "title": "ثبت‌نام در ElectroCar",
    "subtitle": "حساب کاربری خود را ایجاد کنید",
    "sideA": "اخبار، بررسی‌ها و فناوری آینده",
    "sideB": "دنیای خودروهای برقی را در ElectroCar دنبال کنید.",
    "button": "ارسال کد تأیید",
    "switchText": "قبلاً حساب دارید؟",
    "switchLink": "ورود به حساب",
    "switchTo": "login"
  },
  "forgot": {
    "title": "فراموشی رمز عبور",
    "subtitle": "شماره موبایل خود را وارد کنید تا کد ورود برایتان ارسال شود",
    "button": "ارسال کد",
    "switchText": "رمز را به یاد آوردید؟",
    "switchLink": "بازگشت به ورود",
    "switchTo": "login"
  },
  "code": {
    "title": "تأیید شماره موبایل",
    "subtitle": "کد ۶ رقمی ارسال‌شده به",
    "button": "تأیید",
    "switchText": "",
    "switchLink": "",
    "switchTo": "login"
  },
  "messages": {
    "invalidId": "شماره موبایل معتبر نیست (مثال: 09123456789).",
    "passwordShort": "رمز عبور باید حداقل ۶ کاراکتر باشد.",
    "mismatch": "رمز عبور و تکرار آن یکسان نیستند.",
    "agreeTerms": "لطفاً قوانین و مقررات را بپذیرید.",
    "invalidCode": "کد ۶ رقمی را وارد کنید.",
    "loginFailed": "شماره موبایل یا رمز عبور اشتباه است.",
    "loginBlocked": "این حساب کاربری فعال نیست.",
    "noPassword": "برای این حساب رمز عبور تعیین نشده است؛ از «فراموشی رمز عبور» با کد ورود استفاده کنید.",
    "codeWrong": "کد اشتباه است یا منقضی شده است.",
    "sendFailed": "ارسال کد ناموفق بود. دوباره تلاش کنید.",
    "network": "ارتباط با سرور برقرار نشد. اینترنت را بررسی کنید.",
    "server": "مشکلی در سرور رخ داد. بعداً دوباره تلاش کنید."
  }
};

const CAR_IMAGE = "/images/login-car.png";


function Svg({ children, className = "h-5 w-5" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const LockIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.4" />
    <path d="M8.2 10.5V8a3.8 3.8 0 0 1 7.6 0v2.5" />
  </Svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <circle cx="12" cy="8" r="3.8" />
    <path d="M4.5 20c.6-3.6 3.7-5.6 7.5-5.6s6.9 2 7.5 5.6" />
  </Svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M6.6 3.5h2.7l1.5 4-1.9 1.3a11 11 0 0 0 5.3 5.3l1.3-1.9 4 1.5v2.7a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  </Svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.6" />
    <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
  </Svg>
);

const EyeIcon = ({ off = false, className }: { off?: boolean; className?: string }) => (
  <Svg className={className}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.8" />
    {off && <path d="m4 4 16 16" />}
  </Svg>
);

const ArrowIcon = ({ className }: { className?: string }) => (
  <Svg className={`${className ?? "h-5 w-5"} rtl:-scale-x-100`}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Tick() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  filled = false,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  filled?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-400 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-[#39f77b] text-transparent transition peer-focus-visible:ring-2 peer-focus-visible:ring-[#39f77b]/50 ${
          checked ? (filled ? "bg-[#39f77b] !text-[#04120a]" : "!text-[#39f77b]") : "text-transparent"
        }`}
      >
        <Tick />
      </span>
      {label}
    </label>
  );
}


const fieldBox =
  "flex h-14 items-center gap-3 rounded-2xl border border-[#1fb59a]/40 bg-black/40 px-4 transition focus-within:border-[#39f77b] focus-within:ring-4 focus-within:ring-[#39f77b]/10";

const inputClass =
  "h-full min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-gray-500";

export default function LoginMobileFa() {
  const f = useAuthForm({ lang: "fa", idKind: "mobile", messages: t.messages });

  const { view } = f;
  const isLogin = view === "login";
  const isSignup = view === "signup";
  const isCode = view === "code";

  const c = t[view];

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#06141a] via-[#04090d] to-[#030609] text-white"
    >
      {/* Faint car + grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(57,247,123,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(57,247,123,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#1fd16f]/20 blur-[100px]" />
      <img
        src={CAR_IMAGE}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[34%] w-[170%] max-w-none -translate-x-1/2 select-none opacity-[0.16]"
        draggable={false}
      />

      <div className="relative mx-auto w-full max-w-md px-6 pb-12 pt-20">
        <h1 className="text-center text-[28px] font-extrabold leading-tight">
          {c.title}
        </h1>

        <p className="mt-3 text-center text-sm text-gray-400">
          {c.subtitle}
          {isCode && (
            <>
              {" "}
              <bdi dir="ltr" className="text-[#39f77b]">{f.destination}</bdi>
            </>
          )}
        </p>

        <form onSubmit={f.handleSubmit} className="mt-9 space-y-4">
          {isSignup && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                {t.name}
              </label>
              <div className={fieldBox}>
                <UserIcon className="h-6 w-6 shrink-0 text-[#39f77b]" />
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={f.name}
                  onChange={(e) => f.setName(e.target.value)}
                  placeholder={t.namePh}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {!isCode && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                {t.id}
              </label>
              <div className={fieldBox}>
                <PhoneIcon className="h-6 w-6 shrink-0 text-[#39f77b]" />
                <input
                  type="tel"
                  required
                  dir="ltr"
                  inputMode="tel"
                  autoComplete="tel"
                  value={f.id}
                  onChange={(e) => f.setId(e.target.value)}
                  placeholder={t.idPh}
                  className={`${inputClass} text-right`}
                />
              </div>
            </div>
          )}

          {(isLogin || isSignup) && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                {t.password}
              </label>
              <div className={fieldBox}>
                <LockIcon className="h-6 w-6 shrink-0 text-[#39f77b]" />
                <input
                  type={f.showPass ? "text" : "password"}
                  required
                  value={f.password}
                  onChange={(e) => f.setPassword(e.target.value)}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder={isLogin ? t.passwordPhLogin : t.passwordPhSignup}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => f.setShowPass(!f.showPass)}
                  aria-label={f.showPass ? t.hide : t.show}
                  className="shrink-0 text-gray-500 transition hover:text-[#39f77b]"
                >
                  <EyeIcon off={f.showPass} className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {isSignup && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                {t.confirm}
              </label>
              <div className={fieldBox}>
                <LockIcon className="h-6 w-6 shrink-0 text-[#39f77b]" />
                <input
                  type={f.showPass ? "text" : "password"}
                  required
                  value={f.confirm}
                  onChange={(e) => f.setConfirm(e.target.value)}
                  autoComplete="new-password"
                  placeholder={t.confirmPh}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {isCode && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                {t.codeLabel}
              </label>
              <div className={fieldBox}>
                <input
                  type="text"
                  required
                  dir="ltr"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={f.code}
                  onChange={(e) => f.setCode(e.target.value)}
                  placeholder="------"
                  className={`${inputClass} text-center text-2xl font-bold tracking-[0.5em]`}
                />
              </div>
            </div>
          )}

          {f.error && (
            <p role="alert" className="text-sm text-red-400">
              {f.error}
            </p>
          )}

          {isLogin && (
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => f.goTo("forgot")}
                className="text-sm font-bold text-[#39f77b] transition hover:brightness-125"
              >
                {t.forgotLink}
              </button>
            </div>
          )}

          {isSignup && (
            <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={f.agree}
                onChange={(e) => f.setAgree(e.target.checked)}
                className="h-5 w-5 accent-[#39f77b]"
              />
              {t.terms}
            </label>
          )}

          <button
            type="submit"
            disabled={f.loading}
            className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#10e59a] to-[#39f77b] text-base font-bold text-[#031008] shadow-[0_12px_36px_-12px_rgba(57,247,123,0.7)] transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {f.loading ? <Spinner /> : c.button}
          </button>
        </form>

        {isCode ? (
          <div className="mt-8 flex flex-col items-center gap-3 text-sm text-gray-400">
            {f.cooldown > 0 ? (
              <span>{t.resendIn.replace("{s}", String(f.cooldown))}</span>
            ) : (
              <button
                type="button"
                onClick={f.resend}
                disabled={f.loading}
                className="font-bold text-[#39f77b] transition hover:brightness-125 disabled:opacity-60"
              >
                {t.resend}
              </button>
            )}

            <button type="button" onClick={f.backFromCode} className="transition hover:text-white">
              {t.changeId}
            </button>
          </div>
        ) : (
          <p className="mt-8 text-center text-sm text-gray-400">
            {c.switchText}{" "}
            <button
              type="button"
              onClick={() => f.goTo(c.switchTo as "login" | "signup")}
              className="font-bold text-[#39f77b] transition hover:brightness-125"
            >
              {c.switchLink}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
