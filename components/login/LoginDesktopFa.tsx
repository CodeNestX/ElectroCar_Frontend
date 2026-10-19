"use client";

import { useAuthForm } from "./useAuthForm";

// Desktop layout, Persian. Rendering only: all logic is in ./useAuthForm.ts (API calls in @/lib/auth).
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


const fieldClass =
  "h-[60px] w-full rounded-2xl border border-white/10 bg-[#04090d] px-5 text-[15px] text-white outline-none transition placeholder:text-gray-600 focus:border-[#39f77b]/60 focus:ring-4 focus:ring-[#39f77b]/10";

export default function LoginDesktopFa() {
  const f = useAuthForm({ lang: "fa", idKind: "mobile", messages: t.messages });

  const { view } = f;
  const isLogin = view === "login";
  const isSignup = view === "signup";
  const isCode = view === "code";

  const c = t[view];
  const side = isSignup ? t.signup : t.login;

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#050d12] text-white"
    >
      {/* Grid + glows */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(57,247,123,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(57,247,123,0.045)_1px,transparent_1px)] bg-[size:120px_120px]" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[620px] w-[620px] rounded-full bg-[#1fd16f]/20 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-52 -right-32 h-[560px] w-[560px] rounded-full bg-[#1fd16f]/15 blur-[150px]" />

      <div className="relative mx-auto flex min-h-screen max-w-[1440px] items-center justify-between gap-12 px-[6%] pb-20 pt-10">
        {/* Welcome side */}
        <div className="hidden max-w-[600px] flex-1 lg:block">
          <span className="block h-[3px] w-10 rounded-full bg-[#39f77b]" />

          <h1 className="mt-4 text-4xl font-extrabold leading-[1.4] xl:text-[50px]">
            <span className="block">{t.welcomeA}</span>
            <span className="block text-[#39f77b]">{t.welcomeB}</span>
          </h1>

          <p className="mt-5 text-lg leading-9 text-gray-400">
            {side.sideA}
            <br />
            {side.sideB}
          </p>

          <img
            src={CAR_IMAGE}
            alt=""
            className="mt-8 w-full max-w-[540px] select-none drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]"
            draggable={false}
          />
        </div>

        {/* Form card */}
        <div className="w-full max-w-[530px] shrink-0 rounded-[2rem] border border-white/10 bg-[#08151b]/90 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-9">
          <h2 className="text-3xl font-extrabold leading-tight">{c.title}</h2>

          <p className="mt-3 text-sm font-semibold text-gray-300">
            {c.subtitle}
            {isCode && (
              <>
                {" "}
                <bdi dir="ltr" className="text-[#39f77b]">{f.destination}</bdi>
              </>
            )}
          </p>

          <form
            onSubmit={f.handleSubmit}
            className={isSignup ? "mt-6 space-y-4" : "mt-9 space-y-6"}
          >
            {isSignup && (
              <div>
                <label className="mb-2 block text-sm text-gray-300">{t.name}</label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={f.name}
                  onChange={(e) => f.setName(e.target.value)}
                  placeholder={t.namePh}
                  className={fieldClass}
                />
              </div>
            )}

            {!isCode && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  {t.id}
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  inputMode="tel"
                  autoComplete="tel"
                  value={f.id}
                  onChange={(e) => f.setId(e.target.value)}
                  placeholder={t.idPh}
                  className={`${fieldClass} text-right`}
                />
              </div>
            )}

            {(isLogin || isSignup) && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  {t.password}
                </label>
                <div className="relative">
                  {isSignup && (
                    <LockIcon className="pointer-events-none absolute start-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  )}
                  <input
                    type={f.showPass ? "text" : "password"}
                    required
                    value={f.password}
                    onChange={(e) => f.setPassword(e.target.value)}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    placeholder={isLogin ? t.passwordPhLogin : t.passwordPhSignup}
                    className={`${fieldClass} ${isLogin ? "pe-14" : "ps-14"}`}
                  />
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => f.setShowPass(!f.showPass)}
                      aria-label={f.showPass ? t.hide : t.show}
                      className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#39f77b]"
                    >
                      <EyeIcon off={f.showPass} className="h-6 w-6" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {isSignup && (
              <div>
                <label className="mb-2 block text-sm text-gray-300">{t.confirm}</label>
                <div className="relative">
                  <LockIcon className="pointer-events-none absolute start-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type={f.showConfirm ? "text" : "password"}
                    required
                    value={f.confirm}
                    onChange={(e) => f.setConfirm(e.target.value)}
                    autoComplete="new-password"
                    placeholder={t.confirmPh}
                    className={`${fieldClass} ps-14`}
                  />
                </div>
              </div>
            )}

            {isCode && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  {t.codeLabel}
                </label>
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
                  className={`${fieldClass} text-center text-2xl font-bold tracking-[0.5em]`}
                />
              </div>
            )}

            {f.error && (
              <p role="alert" className="text-sm text-red-400">
                {f.error}
              </p>
            )}

            {isLogin && (
              <div className="flex items-center justify-between gap-4">
                <Checkbox checked={f.remember} onChange={f.setRemember} label={t.remember} />
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
              <Checkbox checked={f.agree} onChange={f.setAgree} label={t.terms} filled />
            )}

            <button
              type="submit"
              disabled={f.loading}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#10e59a] to-[#39f77b] font-bold text-[#031008] shadow-[0_12px_36px_-12px_rgba(57,247,123,0.7)] transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 ${
                isSignup ? "h-14 text-base" : "mt-2 h-[68px] text-lg"
              }`}
            >
              {f.loading ? <Spinner /> : c.button}
              {isLogin && !f.loading && <ArrowIcon className="h-5 w-5" />}
            </button>
          </form>

          {/* Footer links */}
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

              <button
                type="button"
                onClick={f.backFromCode}
                className="transition hover:text-white"
              >
                {t.changeId}
              </button>
            </div>
          ) : (
            <p className={`text-center text-sm text-gray-400 ${isLogin ? "mt-16" : "mt-5"}`}>
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

      <p className="absolute inset-x-0 bottom-8 px-4 text-center text-sm text-[#475690]">
        {t.copyright}
      </p>
    </div>
  );
}
