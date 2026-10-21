import AboutContent from "@/components/AboutContent";

export const metadata = {
  title: "درباره ما | ElectroCar",
  description:
    "ElectroCar یک مجله تخصصی درباره خودروهای برقی، فناوری، شارژ و آینده حمل‌ونقل الکتریکی است.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#050b11] pt-10 sm:pt-15">
      <AboutContent />
    </main>
  );
}

