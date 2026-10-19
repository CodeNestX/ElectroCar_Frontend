"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, type FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { sendMessage } from "@/api/services"; // اتصال به بک‌اند

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

  return (
    <svg {...common}>
      <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path d="M8.5 11h7" />
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
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition duration-200 hover:-translate-y-0.5 hover:border-[#39f77b]/50 hover:bg-[#39f77b]/10 hover:text-[#39f77b] hover:shadow-[0_8px_24px_-8px_rgba(57,247,123,0.5)]"
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
      value: "info@electrocar.ir",
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
      value: "info@electrocar.ir",
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
      q: "ElectroCar درباره چه موضوعاتی محتوا منتشر می‌کند؟",
      a: "اخبار، مقالات آموزشی، خودروهای برقی، فناوری‌های مرتبط و راهنمای شارژ.",
    },
    {
      q: "آیا امکان همکاری با ElectroCar وجود دارد؟",
      a: "بله. برای همکاری، پیشنهاد محتوا یا سایر درخواست‌ها می‌توانید از فرم تماس استفاده کنید.",
    },
  ],
  en: [
    {
      q: "What topics does ElectroCar publish content about?",
      a: "News, educational articles, electric cars, related technologies, and charging guides.",
    },
    {
      q: "Is it possible to collaborate with ElectroCar?",
      a: "Yes. For collaboration, content suggestions, or other requests, you can use the contact form.",
    },
  ],
};

const ui = {
  fa: {
    badge: "ارتباط با ElectroCar",
    titleA: "با ما در",
    highlight: "ارتباط باشید",
    desc: "پیشنهاد، انتقاد، درخواست همکاری یا ایده‌ای برای بهتر شدن ElectroCar دارید؟ پیام خود را برای ما ارسال کنید.",
    contactTitle: "راه‌های ارتباطی",
    contactDesc: "برای ارتباط با تیم ElectroCar می‌توانید از اطلاعات زیر استفاده کنید.",
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
    badge: "Contact ElectroCar",
    titleA: "Get in",
    highlight: "touch with us",
    desc: "Have a suggestion, a criticism, a collaboration request, or an idea for making ElectroCar better? Send us your message.",
    contactTitle: "Ways to reach us",
    contactDesc: "You can use the information below to get in touch with the ElectroCar team.",
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; text: string } | null>(null);

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
      // استفاده از سرویس متصل به Axios
      await sendMessage(name, subject, message, mail, mobile);
      
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
            <div>
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
              <div className="mb-7">
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
                    <label className="mb-2 block text-sm text-gray-400">{t.email}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className={inputClass}
                    />
                  </div>
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
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      feedback.type === "ok"
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