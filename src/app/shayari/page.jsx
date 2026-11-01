import QuoteGrid from "@/components/sections/QuoteGrid";

export const metadata = {
  title: "Shayari",
  description:
    "A colourful gallery of Hindi and Hinglish Shayaris for every mood — love, life, motivation and more. Share or download any as an image.",
  alternates: { canonical: "/shayari" },
};

export default function ShayariPage() {
  return (
    <div className="pt-20">
      <QuoteGrid
        title="Shayari"
        subtitle="Dil se likhe gaye lafz — Hindi aur Hinglish shayari ka ek rang-birangi gallery."
        initialType="shayari"
        showTypeToggle={false}
        restrictType="shayari"
        baseSeed="shayari-page"
      />
    </div>
  );
}
