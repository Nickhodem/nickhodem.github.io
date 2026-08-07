import { ExternalLink, GitFork, Map } from "lucide-react";
import RevealSection from "./RevealSection";

const links = [
  {
    icon: Map,
    title: "VLM Landscape",
    description: "Explore model categories, timelines, architectures, and trade-offs.",
    href: "/vlm-explorer/",
  },
  {
    icon: GitFork,
    title: "VLM Family Tree",
    description: "Trace disclosed vision encoders and language-backbone lineages.",
    href: "/vlm-family-tree/",
  },
];

const LinksSection = () => {
  return (
    <section id="links" className="relative py-28 px-6 z-10">
      <div className="max-w-3xl mx-auto">
        <RevealSection>
          <p className="font-mono text-primary text-sm mb-3 tracking-wider"># links</p>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
            Interactive <span className="text-gradient">references.</span>
          </h3>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
            Explore two practical maps of the vision-language model ecosystem.
          </p>
        </RevealSection>

        <div className="grid sm:grid-cols-2 gap-5">
          {links.map(({ icon: Icon, title, description, href }, index) => (
            <RevealSection key={title} delay={index * 0.1}>
              <a
                href={href}
                className="block h-full border border-border rounded-xl p-7 bg-card card-hover group"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                  {title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </a>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinksSection;