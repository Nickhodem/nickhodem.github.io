import RevealSection from "./RevealSection";

const MissionSection = () => {
  return (
    <section id="mission" className="relative py-28 px-6 z-10">
      <div className="max-w-3xl mx-auto">
        <RevealSection>
          <p className="font-mono text-primary text-sm mb-3 tracking-wider"># mission</p>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-10 leading-tight">
            From research to
            <br />
            <span className="text-gradient">real-world impact.</span>
          </h3>
        </RevealSection>

        <RevealSection delay={0.15}>
          <div className="border border-border rounded-xl bg-card glow overflow-hidden card-hover">
            <div className="px-4 py-2.5 border-b border-border flex items-center gap-2 bg-muted/30">
              <span className="w-3 h-3 rounded-full bg-destructive/50" />
              <span className="w-3 h-3 rounded-full bg-primary/30" />
              <span className="w-3 h-3 rounded-full bg-primary/50" />
              <span className="font-mono text-xs text-muted-foreground ml-2">mission.py</span>
            </div>
            <div className="p-8 font-mono text-sm leading-[2]">
              <p className="text-muted-foreground">
                <span className="text-primary">def</span>{" "}
                <span className="text-accent">forward</span>
                <span className="text-muted-foreground">(self, world):</span>
              </p>
              <p className="pl-6 text-primary">"""</p>
              <p className="pl-6 text-secondary-foreground">
                I bridge cutting-edge AI research and production
              </p>
              <p className="pl-6 text-secondary-foreground">
                systems that operate in the real world.
              </p>
              <p className="pl-6 text-secondary-foreground">&nbsp;</p>
              <p className="pl-6 text-secondary-foreground">
                From training RL agents to control autonomous
              </p>
              <p className="pl-6 text-secondary-foreground">
                vehicles, to deploying computer vision at city
              </p>
              <p className="pl-6 text-secondary-foreground">
                scale — I build AI that works beyond the notebook.
              </p>
              <p className="pl-6 text-primary">"""</p>
              <p className="pl-6 text-muted-foreground mt-2">
                <span className="text-primary">return</span> self.transform(world)
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};

export default MissionSection;
