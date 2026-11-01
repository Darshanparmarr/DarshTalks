import Link from "next/link";
import { Linkedin, Globe, Mail } from "lucide-react";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Quotes", href: "/quotes" },
  { label: "Shayari", href: "/shayari" },
  { label: "About", href: "/about" },
  { label: "Connect", href: "/connect" },
];

const TOPICS = [
  { label: "Motivational Quotes", href: "/quotes?category=Motivation" },
  { label: "Life Quotes", href: "/quotes?category=Life" },
  { label: "Self Love Quotes", href: "/quotes?category=Self+Love" },
  { label: "Positive Thoughts", href: "/quotes?category=Positivity" },
  { label: "Hindi Shayari", href: "/shayari" },
  { label: "Two Line Shayari", href: "/shayari" },
  { label: "Deep Thoughts About Life", href: "/quotes?category=Life" },
  { label: "Inspirational Quotes", href: "/quotes" },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/darshanparmarr/",
    Icon: Linkedin,
  },
  {
    label: "Portfolio",
    href: "https://darshanparmardev.vercel.app/",
    Icon: Globe,
  },
  {
    label: "Email",
    href: "mailto:darshuparmar67@gmail.com",
    Icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-base-soft">
      <div className="mx-auto flex max-w-shell flex-col gap-10 px-4 py-14 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <span className="font-body text-2xl font-extrabold tracking-tight">
            Darsh<span className="text-accent">Talks</span>
          </span>
          <p className="mt-4 text-ink-muted">
            A digital typography gallery of quotes, thoughts and Shayaris — one
            feeling per card, every card a little piece of art.
          </p>

          {/* Social / connect */}
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-muted transition-colors duration-300 hover:border-accent hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
          <nav aria-label="Footer">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-muted/70">
              Site
            </h3>
            <ul className="flex flex-col gap-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-medium text-ink-muted transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Popular topics">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-muted/70">
              Popular topics
            </h3>
            <ul className="flex flex-col gap-3">
              {TOPICS.map((t) => (
                <li key={t.label}>
                  <Link
                    href={t.href}
                    className="text-sm font-medium text-ink-muted transition-colors hover:text-white"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-shell flex-col gap-2 px-4 py-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} DarshTalks. Made with words.</p>
          <p>
            Designed &amp; built by{" "}
            <a
              href="https://darshanparmardev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink transition-colors hover:text-accent"
            >
              Darshan Parmar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
