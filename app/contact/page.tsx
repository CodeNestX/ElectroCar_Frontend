import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "تماس با ما | ElectroCar",
  description:
    "راه‌های ارتباط با تیم ElectroCar برای ارسال پیشنهاد، همکاری و ارتباط با ما.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#050b11] pt-10 sm:pt-15">
      <ContactContent />;
    </main>
  );
}
