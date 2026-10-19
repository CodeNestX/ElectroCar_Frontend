import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "تماس با ما | ElectroCar",
  description:
    "راه‌های ارتباط با تیم ElectroCar برای ارسال پیشنهاد، همکاری و ارتباط با ما.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#050b11] pt-[40px] sm:pt-[60px]">
      <ContactContent />;
    </main>
  );
}
