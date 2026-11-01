import { SITE_URL } from "@/config/site";

export default function sitemap() {
  const now = new Date();
  const routes = ["", "/quotes", "/shayari", "/about", "/connect"];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
