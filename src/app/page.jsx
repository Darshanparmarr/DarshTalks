import Hero from "@/components/sections/Hero";
import QuoteGrid from "@/components/sections/QuoteGrid";
import TopicLinks from "@/components/sections/TopicLinks";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuoteGrid
        title="The Collection"
        subtitle="Every card a different voice — a different font, a different mood. Scroll, search, or shuffle the whole gallery."
      />
      <TopicLinks />
    </>
  );
}
