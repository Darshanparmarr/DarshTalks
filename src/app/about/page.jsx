import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "About",
  description:
    "What DarshTalks is: a digital typography gallery of quotes, thoughts and Shayaris, designed and built by Darshan Parmar.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    k: "01",
    title: "Typography is the artwork",
    body: "No photos, no illustrations — just letters. Every card picks its own font so the words carry the mood.",
    color: "#8054E8",
  },
  {
    k: "02",
    title: "Colour is the personality",
    body: "A palette of twelve vivid tones gives each thought a feeling. Purple calm, coral energy, mint ease.",
    color: "#FF815A",
  },
  {
    k: "03",
    title: "The layout is the experience",
    body: "An asymmetric, portrait-only masonry grid that you can shuffle endlessly into fresh combinations.",
    color: "#36C9B5",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-shell px-4 pb-24 pt-36 sm:px-6">
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
        About DarshTalks
      </p>

      <h1 className="font-body max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
        A gallery for <span className="text-accent">words</span> that are worth
        keeping.
      </h1>

      <p className="mt-8 max-w-2xl text-lg text-ink-muted sm:text-xl">
        DarshTalks is a creative platform to explore motivational quotes,
        meaningful thoughts, Hindi Shayaris, life lessons and spiritual words.
        Think of it as a premium editorial magazine crossed with a typography
        gallery — every quote styled like a small piece of art.
      </p>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {PRINCIPLES.map((p) => (
          <div
            key={p.k}
            className="rounded-3xl border border-white/10 bg-base-soft p-7"
          >
            <span
              className="font-body text-3xl font-extrabold"
              style={{ color: p.color }}
            >
              {p.k}
            </span>
            <h2 className="mt-4 text-xl font-bold">{p.title}</h2>
            <p className="mt-3 text-ink-muted">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-center gap-4">
        <Button as={Link} href="/quotes">
          Explore the collection
        </Button>
        <Button as={Link} href="/shayari" variant="outline">
          Read the Shayari
        </Button>
      </div>
    </div>
  );
}
