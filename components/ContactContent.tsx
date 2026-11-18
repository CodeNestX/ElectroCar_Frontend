"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { getUserInfo, sendMessage } from "@/api/services"; // اتصال به بک‌اند

// Persian / Arabic digits -> latin 
function normalizeDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

const socialLinks = [
  { key: "instagram", href: "https://instagram.com/", label: "Instagram" },
  { key: "telegram", href: "https://t.me/", label: "Telegram" },
  { key: "bale", href: "https://ble.ir/", label: "Bale" },
] as const;

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["key"] }) {
  const common = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "instagram") {
    return (
      <svg {...common}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    );
  }

  if (name === "telegram") {
    return (
      <svg {...common}>
        <path d="M21 4 3 11l5.5 2L19 6.5 10 14.5V19l3-3.2 4.5 3.2L21 4Z" />
      </svg>
    );
  }

  // Bale official logo (without text)
  return (
    <svg
      className={common.className}
      viewBox="-1 -10 612 612"
      fill="currentColor"
      aria-hidden="true"
    >
      <g transform="translate(59.0625, 9.375)">
        <path d="M0 0 C10.16888405 6.59451569 20.07714491 13.58075916 29.9375 20.625 C30.71512695 21.17833008 31.49275391 21.73166016 32.29394531 22.30175781 C34.57422328 23.92584068 36.85061977 25.55516969 39.125 27.1875 C39.85299805 27.70892578 40.58099609 28.23035156 41.33105469 28.76757812 C45.18760438 31.5539138 48.95766215 34.41471661 52.6640625 37.3984375 C53.43339111 38.01130615 54.20271973 38.6241748 54.99536133 39.25561523 C56.46642118 40.43453391 57.92534747 41.62880254 59.36987305 42.84008789 C60.02769775 43.36594482 60.68552246 43.89180176 61.36328125 44.43359375 C61.93473877 44.90595459 62.50619629 45.37831543 63.0949707 45.86499023 C64.9995315 46.86750833 64.9995315 46.86750833 67.34375 45.99291992 C70.13447195 44.5211188 72.50901416 42.85057037 75.01171875 40.9296875 C80.68849269 36.71981701 86.57097611 33.16856948 92.75 29.75 C94.37905273 28.84664917 94.37905273 28.84664917 96.04101562 27.92504883 C167.56652016 -11.21714814 250.78112602 -19.09103771 328.85253906 3.46728516 C382.11163928 19.31969969 434.75742985 52.02113796 469.66796875 95.796875 C471.97153323 98.66740974 474.35579548 101.45485214 476.75 104.25 C487.70043035 117.42102846 496.664973 131.65771181 504.9375 146.625 C505.36272949 147.37974609 505.78795898 148.13449219 506.22607422 148.91210938 C544.21000034 216.49750349 551.21148764 299.08937076 530.77734375 373.26171875 C515.1127555 428.24745326 482.92134349 480.63241558 438.9375 517.625 C438.39480469 518.08148926 437.85210937 518.53797852 437.29296875 519.00830078 C391.41772881 557.40548367 335.66231712 582.89492136 275.9375 589.625 C274.71341431 589.76639404 274.71341431 589.76639404 273.46459961 589.91064453 C263.08971631 590.94342162 252.66568348 590.86870441 242.25 590.875 C240.74475769 590.87601212 240.74475769 590.87601212 239.20910645 590.87704468 C223.89964207 590.86070603 209.04297596 590.31818366 193.9375 587.625 C192.92993652 587.45339355 191.92237305 587.28178711 190.88427734 587.10498047 C133.221793 577.11514923 81.05670842 551.04271011 37.9375 511.625 C36.9784375 510.77035156 36.019375 509.91570313 35.03125 509.03515625 C8.15034688 484.99139125 -13.75821123 454.28082699 -29.08398438 421.70166016 C-29.75710697 420.27312203 -30.4385868 418.84850153 -31.12695312 417.42724609 C-44.15961992 390.47123201 -51.99687007 361.8049048 -56.375 332.25 C-56.53460205 331.18273682 -56.6942041 330.11547363 -56.85864258 329.01586914 C-59.48552498 309.84441428 -59.21585121 290.42462324 -59.22363281 271.1171875 C-59.22774614 268.40467651 -59.23327906 265.69216873 -59.23867798 262.97966003 C-59.25211569 255.67242207 -59.25826029 248.36518968 -59.26268864 241.05794144 C-59.26547073 236.48539365 -59.26971092 231.91284791 -59.27419281 227.34030151 C-59.28635645 214.64525995 -59.29666785 201.95021999 -59.3000679 189.25517273 C-59.30028747 188.44686557 -59.30050703 187.63855842 -59.30073325 186.80575711 C-59.30095153 185.99572403 -59.30116981 185.18569095 -59.3013947 184.35111141 C-59.30183814 182.71014849 -59.30228471 181.06918557 -59.30273438 179.42822266 C-59.3029558 178.61428012 -59.30317723 177.80033758 -59.30340537 176.96173012 C-59.30736203 163.74380319 -59.32485543 150.52593108 -59.3480939 137.30802536 C-59.37183554 123.69294267 -59.38427069 110.07788753 -59.38543582 96.46278381 C-59.38634993 88.83573396 -59.39203724 81.20875602 -59.41025543 73.58172607 C-59.42569311 67.09703107 -59.43075455 60.61243032 -59.42251733 54.12772042 C-59.41862648 50.8248289 -59.42111609 47.52216557 -59.43357468 44.21928978 C-59.44632028 40.62918595 -59.44040305 37.03956387 -59.42999268 33.44946289 C-59.43804908 32.4202667 -59.44610548 31.39107052 -59.45440602 30.33068657 C-59.38128425 19.49576827 -57.67854825 9.6757542 -50.0625 1.625 C-49.49789062 0.99722656 -48.93328125 0.36945312 -48.3515625 -0.27734375 C-33.98209748 -14.61649345 -15.17750021 -9.63381837 0 0 Z M318.90039062 184.56445312 C317.62161305 185.84515401 316.34260455 187.12562435 315.06338501 188.40588379 C312.32943162 191.14297649 309.59703389 193.88160906 306.86585999 196.62147522 C302.54905288 200.95188368 298.22836305 205.27840432 293.90710449 209.60437012 C284.74759034 218.77494106 275.59234113 227.94976441 266.4375 237.125 C256.52486751 247.05966673 246.61149141 256.99358498 236.69325781 266.92266035 C232.39470618 271.22620098 228.09860554 275.53216918 223.80435085 279.83999729 C221.14211365 282.5096695 218.4778281 285.17729009 215.81296921 287.84434509 C214.57447301 289.08471998 213.33684482 290.32596224 212.10013199 291.56811523 C210.41770935 293.25770826 208.73227031 294.94423273 207.04602051 296.63000488 C206.55284411 297.12677624 206.05966771 297.6235476 205.55154657 298.13537264 C202.16568698 301.51090651 202.16568698 301.51090651 199.9375 302.625 C199.69978882 302.06262634 199.46207764 301.50025269 199.21716309 300.9208374 C197.64775019 298.10516126 195.74131944 296.17446181 193.46289062 293.89160156 C192.07003845 292.48929291 192.07003845 292.48929291 190.64904785 291.05865479 C189.6308679 290.0440579 188.61242852 289.0297213 187.59375 288.015625 C186.54410075 286.96462682 185.4947484 285.91333205 184.44567871 284.86175537 C182.24306673 282.6561951 180.03688109 280.45428954 177.828125 278.25488281 C175.02202338 275.46009123 172.22488493 272.65652997 169.43045807 269.85007095 C167.26170088 267.67401485 165.0881133 265.50283338 162.91313171 263.33300018 C161.88162654 262.30281384 160.85156207 261.27118254 159.82307434 260.2379837 C144.92699564 245.28873587 129.68255729 233.83073698 107.8125 233.1875 C91.09164839 233.8898664 76.90761937 239.93111415 64.9375 251.625 C52.31698314 266.16228478 48.93447322 281.41007534 49.7421875 300.12548828 C50.17603483 305.67764944 51.71589891 310.5530428 53.9375 315.625 C54.32679687 316.54023438 54.71609375 317.45546875 55.1171875 318.3984375 C62.91875091 334.50935838 79.6590102 347.53960213 92.12109375 360.046875 C93.08543158 361.01527464 94.04974162 361.98370195 95.01402473 362.95215607 C99.54192285 367.49899092 104.07215294 372.04348616 108.6053223 376.5850656 C113.79061195 381.78014385 118.9674844 386.98342704 124.1374802 392.19372439 C128.17068853 396.25726463 132.21170693 400.31293435 136.25846058 404.3629849 C138.65972094 406.76657209 141.05770487 409.1732059 143.44735527 411.58834076 C160.23531249 429.26530496 160.23531249 429.26530496 181.4375 440.625 C182.5615625 440.99625 183.685625 441.3675 184.84375 441.75 C199.9735843 446.02914506 215.59320068 443.9979882 229.625 437.0625 C242.70168371 429.14594618 253.41266884 416.30926011 264.16137695 405.578125 C265.86587398 403.8799063 267.5705555 402.18187275 269.27540588 400.48400879 C274.35030086 395.42817431 279.4210329 390.36817667 284.49087051 385.30727196 C286.40605518 383.39560929 288.32155063 381.48425821 290.23706061 379.57292151 C298.70051838 371.12789526 307.16263627 362.68152906 315.62073994 354.23114014 C317.68017436 352.17361498 319.73961438 350.11609542 321.79907227 348.05859375 C322.31081704 347.54733271 322.82256182 347.03607167 323.34981402 346.50931787 C331.65343011 338.21401553 339.96554134 329.92728005 348.28119753 321.64404917 C356.84671205 313.1116596 365.40462649 304.57170642 373.95519036 296.02433395 C378.74517914 291.23650299 383.53835825 286.45196765 388.34008217 281.67590332 C392.85267331 277.18662942 397.35560207 272.68788235 401.85141563 268.18180847 C403.49785345 266.5348763 405.14768849 264.89133189 406.80123901 263.25154114 C421.51150206 248.67821034 421.51150206 248.67821034 430.8125 230.375 C431.20179688 229.25609375 431.59109375 228.1371875 431.9921875 226.984375 C436.20683198 212.00671281 434.01795344 195.94873845 426.6015625 182.33984375 C417.22645895 167.04478045 404.31859226 157.92615862 386.9375 153.625 C357.12113356 147.9114577 338.32387883 165.05429068 318.90039062 184.56445312 Z " />
      </g>
    </svg>
  );
}

function SocialIconRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((item) => (
        <a
          key={item.key}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-gray-400 transition duration-200 hover:-translate-y-0.5 hover:border-[#39f77b]/50 hover:bg-[#39f77b]/10 hover:text-[#39f77b] hover:shadow-[0_8px_24px_-8px_rgba(57,247,123,0.5)]"
        >
          <SocialIcon name={item.key} />
        </a>
      ))}
    </div>
  );
}

const contactItems = {
  fa: [
    {
      icon: "✉",
      title: "ایمیل",
      value: "info@voltinou.ir",
      description: "برای ارسال پیشنهاد و درخواست همکاری",
    },
    {
      icon: "◎",
      title: "شبکه‌های اجتماعی",
      value: "",
      description: "دنبال کردن آخرین مطالب و اخبار",
    },
  ],
  en: [
    {
      icon: "✉",
      title: "Email",
      value: "info@voltinou.ir",
      description: "For sending suggestions and collaboration requests",
    },
    {
      icon: "◎",
      title: "Social media",
      value: "",
      description: "Follow the latest content and news",
    },
  ],
};

const faq = {
  fa: [
    {
      q: "Voltinou درباره چه موضوعاتی محتوا منتشر می‌کند؟",
      a: "اخبار، مقالات آموزشی، خودروهای برقی، فناوری‌های مرتبط و راهنمای شارژ.",
    },
    {
      q: "آیا امکان همکاری با Voltinou وجود دارد؟",
      a: "بله. برای همکاری، پیشنهاد محتوا یا سایر درخواست‌ها می‌توانید از فرم تماس استفاده کنید.",
    },
  ],
  en: [
    {
      q: "What topics does Voltinou publish content about?",
      a: "News, educational articles, electric cars, related technologies, and charging guides.",
    },
    {
      q: "Is it possible to collaborate with Voltinou?",
      a: "Yes. For collaboration, content suggestions, or other requests, you can use the contact form.",
    },
  ],
};

const ui = {
  fa: {
    badge: "ارتباط با ولتینو",
    titleA: "با ما در",
    highlight: "ارتباط باشید",
    desc: "پیشنهاد، انتقاد، درخواست همکاری یا ایده‌ای برای بهتر شدن ولتینو دارید؟ پیام خود را برای ما ارسال کنید.",
    contactTitle: "راه‌های ارتباطی",
    contactDesc: "برای ارتباط با تیم ولتینو می‌توانید از اطلاعات زیر استفاده کنید.",
    formTitle: "پیام خود را ارسال کنید",
    name: "نام و نام خانوادگی",
    namePh: "نام شما",
    email: "ایمیل",
    phone: "شماره موبایل",
    phonePh: "09123456789",
    subject: "موضوع",
    subjectPh: "موضوع پیام",
    message: "پیام",
    messagePh: "پیام خود را بنویسید...",
    send: "ارسال پیام",
    formNote: "برای پاسخ‌گویی، حداقل یکی از فیلدهای ایمیل یا شماره موبایل را وارد کنید.",
    sending: "در حال ارسال...",
    success: "پیام شما با موفقیت ارسال شد. به زودی بررسی خواهد شد.",
    errRequired: "نام، موضوع و متن پیام را وارد کنید.",
    errContact: "ایمیل یا شماره موبایل را وارد کنید.",
    errEmail: "ایمیل واردشده معتبر نیست.",
    errPhone: "شماره موبایل معتبر نیست (مثال: 09123456789).",
    errNetwork: "ارتباط با سرور برقرار نشد. اینترنت را بررسی کنید.",
    errServer: "مشکلی در سرور رخ داد. بعداً دوباره تلاش کنید.",
    errFallback: "ارسال پیام ناموفق بود. دوباره تلاش کنید.",
    faqTitle: "سوالات متداول",
  },
  en: {
    badge: "Contact Voltinou",
    titleA: "Get in",
    highlight: "touch with us",
    desc: "Have a suggestion, a criticism, a collaboration request, or an idea for making Voltinou better? Send us your message.",
    contactTitle: "Ways to reach us",
    contactDesc: "You can use the information below to get in touch with the Voltinou team.",
    formTitle: "Send us your message",
    name: "Full name",
    namePh: "Your name",
    email: "Email",
    phone: "Mobile number",
    phonePh: "e.g. 09123456789",
    subject: "Subject",
    subjectPh: "Message subject",
    message: "Message",
    messagePh: "Write your message...",
    send: "Send message",
    formNote: "Please enter at least one of email or mobile number so we can reply.",
    sending: "Sending...",
    success: "Your message was sent successfully. We will review it soon.",
    errRequired: "Please enter your name, a subject and a message.",
    errContact: "Please enter an email or a mobile number.",
    errEmail: "The email address is not valid.",
    errPhone: "The mobile number is not valid.",
    errNetwork: "Can't reach the server. Check your connection.",
    errServer: "Something went wrong on our side. Please try again later.",
    errFallback: "Could not send the message. Please try again.",
    faqTitle: "Frequently asked questions",
  },
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#080b10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-[#39f77b]/50";

export default function ContactContent() {
  const { language } = useLanguage();
  const t = ui[language];
  const searchParams = useSearchParams();
  const articleIdParam = searchParams.get("article_id");
  const sourceTypeParam = searchParams.get("source_type") || (articleIdParam ? "article" : "website");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserInfo();
        if (res && res.data?.data) {
          const userData = res.data.data;
          const fullName = `${userData.first_name || ""} ${userData.last_name || ""}`.trim();
          if (fullName && fullName !== "کاربر جدید") {
            setName(fullName);
          }
          if (userData.email) {
            setEmail(userData.email);
          }
          if (userData.mobile) {
            setPhone(userData.mobile);
          }
        }
      } catch (error) {
        console.log("User is not logged in or token is invalid.");
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (sending) return;

    const mobile = normalizeDigits(phone.trim()).replace(/[\s-]/g, "");
    const mail = email.trim();

    const fail = (text: string) => setFeedback({ type: "error", text });

    // اعتبارسنجی فرانت‌اند
    if (!name.trim() || !subject.trim() || !message.trim()) return fail(t.errRequired);
    if (!mail && !mobile) return fail(t.errContact);
    if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return fail(t.errEmail);
    if (mobile && !/^(\+|00)?\d{10,14}$/.test(mobile)) return fail(t.errPhone);

    setFeedback(null);
    setSending(true);

    try {
      // استفاده از سرویس متصل به Axios با انتقال مبدأ و شناسه مقاله (در صورت وجود)
      await sendMessage(
        name,
        subject,
        message,
        mail,
        mobile,
        sourceTypeParam,
        articleIdParam ? Number(articleIdParam) : null
      );

      setFeedback({ type: "ok", text: t.success });
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (error: any) {
      const status = error.response?.status || 0;
      const serverMessage = error.response?.data?.message || "";

      if (status === 0) return fail(t.errNetwork);
      if (status >= 500) return fail(t.errServer);

      // نمایش خطای سمت سرور فقط برای فارسی (چون بک‌اند فارسی برمی‌گرداند)
      return fail(language === "fa" && serverMessage ? serverMessage : t.errFallback);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#05070b] text-white">
        {/* بقیه کدهای ظاهری فرم (Hero و Grid) دقیقاً مثل قبل اینجا قرار می‌گیرد... */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(57,247,123,0.13),transparent_45%)]" />

          <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <span className="inline-flex rounded-full border border-[#39f77b]/20 bg-[#39f77b]/10 px-4 py-2 text-sm text-[#39f77b]">
              {t.badge}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">
              {t.titleA} <span className="text-[#39f77b]">{t.highlight}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-400">
              {t.desc}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            {/* اطلاعات تماس */}
            <div className="text-center lg:text-start">
              <p className="text-sm font-semibold text-[#39f77b]">Contact</p>
              <h2 className="mt-3 text-3xl font-bold">{t.contactTitle}</h2>
              <p className="mt-5 leading-8 text-gray-500">{t.contactDesc}</p>

              <div className="mt-8 space-y-4">
                {contactItems[language].map((item) => (
                  <div key={item.icon} className="rounded-2xl border border-white/10 bg-[#091521] p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#39f77b]/10 text-xl text-[#39f77b]">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        {item.value && (
                          <p className="mt-1 text-sm text-[#39f77b]">
                            <bdi>{item.value}</bdi>
                          </p>
                        )}
                      </div>
                    </div>
                    {!item.value && <SocialIconRow className="mt-4" />}
                    <p className="mt-4 text-sm text-gray-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* فرم */}
            <div className="rounded-3xl border border-white/10 bg-[#091521] p-6 sm:p-8">
              <div className="mb-7 text-center">
                <p className="text-sm font-semibold text-[#39f77b]">Send Message</p>
                <h2 className="mt-2 text-2xl font-bold">{t.formTitle}</h2>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-gray-400">{t.name}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePh}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-gray-400">{t.phone}</label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.phonePh}
                      className={`${inputClass} text-start`}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">{t.email}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">{t.subject}</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t.subjectPh}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">{t.message}</label>
                  <textarea
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.messagePh}
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#080b10] px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-gray-700 focus:border-[#39f77b]/50"
                  />
                </div>

                {feedback && (
                  <p
                    role={feedback.type === "error" ? "alert" : "status"}
                    className={`rounded-xl border px-4 py-3 text-sm ${feedback.type === "ok"
                      ? "border-[#39f77b]/30 bg-[#39f77b]/10 text-[#39f77b]"
                      : "border-red-500/30 bg-red-500/10 text-red-400"
                      }`}
                  >
                    {feedback.text}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-xl bg-[#39f77b] px-6 py-3.5 font-bold text-black transition hover:bg-[#69ff9a] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {sending ? t.sending : t.send}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}