import QuoteGrid from "@/components/sections/QuoteGrid";

export const metadata = {
  title: "Quotes & Shayari",
  description:
    "Explore and search the full DarshTalks collection of 5000+ quotes and Shayaris — filter by category, mood or author, and shuffle the layout.",
  alternates: { canonical: "/quotes" },
};

export default function QuotesPage() {
  return (
    <div className="pt-20">
      <QuoteGrid
        title="Explore Everything"
        subtitle="Filter by type or category, search by mood or author, and shuffle the layout into something new."
        initialType="all"
        baseSeed="quotes-page"
      />
    </div>
  );
}
