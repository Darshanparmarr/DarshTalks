import { Linkedin, Globe, Mail, ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";

export const metadata = {
  title: "Connect",
  description:
    "Connect with Darshan Parmar — the maker of DarshTalks. Find me on LinkedIn, my portfolio, or reach out over email.",
  alternates: { canonical: "/connect" },
};

const CARDS = [
  {
    label: "LinkedIn",
    value: "in/darshanparmarr",
    href: site.author.linkedin,
    Icon: Linkedin,
    bg: "#2859A8",
    fg: "#FFFFFF",
    desc: "Let's connect professionally.",
  },
  {
    label: "Portfolio",
    value: "darshanparmardev.vercel.app",
    href: site.author.url,
    Icon: Globe,
    bg: "#8054E8",
    fg: "#FFFFFF",
    desc: "See my work and projects.",
  },
  {
    label: "Email",
    value: site.author.email,
    href: `mailto:${site.author.email}`,
    Icon: Mail,
    bg: "#FF815A",
    fg: "#2A0A00",
    desc: "Say hello or work with me.",
  },
];

export default function ConnectPage() {
  return (
    <div className="mx-auto w-full max-w-shell px-4 pb-24 pt-36 sm:px-6">
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
        Connect
      </p>

      <h1 className="font-body max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
        Let&apos;s <span className="text-accent">connect</span>.
      </h1>

      <p className="mt-8 max-w-2xl text-lg text-ink-muted sm:text-xl">
        DarshTalks is designed and built by{" "}
        <a
          href={site.author.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ink underline-offset-4 hover:text-accent hover:underline"
        >
          Darshan Parmar
        </a>
        . If you&apos;d like to collaborate, share feedback, or just say hello —
        here&apos;s where to find me.
      </p>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map(({ label, value, href, Icon, bg, fg, desc }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={`${label}: ${value}`}
            className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl p-7 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-premium hover:-translate-y-1.5"
            style={{ backgroundColor: bg, color: fg }}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/15">
                <Icon size={24} />
              </span>
              <ArrowUpRight
                size={24}
                className="opacity-70 transition-transform duration-300 ease-premium group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>

            <div>
              <h2 className="font-body text-2xl font-extrabold tracking-tight">{label}</h2>
              <p className="mt-1 text-sm opacity-80">{desc}</p>
              <p className="mt-4 break-all text-sm font-semibold opacity-90">{value}</p>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-12 text-ink-muted">
        Prefer email? Reach me directly at{" "}
        <a
          href={`mailto:${site.author.email}`}
          className="font-semibold text-ink underline-offset-4 hover:text-accent hover:underline"
        >
          {site.author.email}
        </a>
        .
      </p>
    </div>
  );
}
