// app/page.tsx
import Link from "next/link";

const TOOLS = [
  {
    title: "IKE: Generali vs ETF mBank",
    description: "Kalkulator porównujący wyniki IKE w Generali TFI i ETF w mBanku po kosztach.",
    href: "/ike-comparison",
    tag: "Finanse osobiste",
  },
];

const ARTICLES: { title: string; href: string; date: string }[] = [
  // Add articles here
];

const LINKS = [
  { label: "GitHub", href: "https://github.com/nikodem-pankiewicz", icon: "GH" },
  { label: "LinkedIn", href: "https://linkedin.com/in/nikodem-pankiewicz", icon: "in" },
  { label: "Email", href: "mailto:nikodem@example.com", icon: "@" },
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "64px 24px 96px" }}>

      {/* Hero */}
      <section style={{ marginBottom: 72 }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-1px", marginBottom: 12 }}>
          Nikodem Pankiewicz
        </h1>
        <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.6 }}>
          Software engineer. I build things and occasionally write about them.
        </p>
      </section>

      {/* About */}
      <section id="about" style={{ marginBottom: 72 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#60a5fa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
          About
        </h2>
        <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.8 }}>
          I&apos;m a developer with a curiosity for finance, data, and clean interfaces.
          This site is where I put things I&apos;ve built or worked through — tools, notes, experiments.
        </p>
      </section>

      {/* Tools */}
      <section id="tools" style={{ marginBottom: 72 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#60a5fa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
          Tools
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {TOOLS.map(tool => (
            <Link key={tool.href} href={tool.href} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#1e293b",
                borderRadius: 12,
                padding: "20px 24px",
                border: "1px solid #334155",
                cursor: "pointer",
                transition: "border-color 0.15s",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "#60a5fa")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "#334155")}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 15 }}>{tool.title}</span>
                  <span style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 6, padding: "2px 8px", fontSize: 11, color: "#94a3b8" }}>
                    {tool.tag}
                  </span>
                </div>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section id="blog" style={{ marginBottom: 72 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: "#60a5fa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
          Articles
        </h2>
        {ARTICLES.length === 0 ? (
          <p style={{ color: "#334155", fontSize: 14 }}>Coming soon.</p>
        ) : (
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {ARTICLES.map(a => (
              <li key={a.href} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href={a.href} style={{ color: "#cbd5e1", fontSize: 14, textDecoration: "none" }}>{a.title}</Link>
                <span style={{ color: "#475569", fontSize: 12 }}>{a.date}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Links */}
      <section>
        <div style={{ display: "flex", gap: 12 }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 8,
              padding: "8px 16px",
              color: "#94a3b8",
              fontSize: 13,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              <span style={{ fontWeight: 700, color: "#f1f5f9" }}>{l.icon}</span>
              {l.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
