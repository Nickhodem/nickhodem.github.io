import { ExternalLink } from "lucide-react";
import RevealSection from "./RevealSection";

const projects = [
  {
    title: "Autonomous Vehicle RL Controller",
    description: "End-to-end reinforcement learning for lateral and longitudinal control of self-driving vehicles. PPO-based agent with Sim2Real transfer.",
    tags: ["PyTorch", "CARLA", "PPO", "Sim2Real"],
    status: "published",
  },
  {
    title: "Urban CV Intelligence Pipeline",
    description: "Real-time multi-camera computer vision for smart city applications. Detection, tracking, and scene understanding at city scale.",
    tags: ["Python", "OpenCV", "TensorRT", "CUDA"],
    status: "production",
  },
  {
    title: "Neural Scene Understanding",
    description: "Transformer-based joint semantic segmentation and depth estimation from monocular street-level imagery.",
    tags: ["PyTorch", "ViT", "ONNX", "TorchScript"],
    status: "research",
  },
  {
    title: "Distributed RL Training Framework",
    description: "Scalable RL training with multi-agent environments, curriculum learning, and automated hyperparameter optimization.",
    tags: ["Ray", "PyTorch", "Gymnasium", "W&B"],
    status: "open-source",
  },
];

const statusColors: Record<string, string> = {
  production: "bg-primary/10 text-primary border-primary/20",
  published: "bg-accent/10 text-accent border-accent/20",
  research: "bg-secondary text-secondary-foreground border-border",
  "open-source": "bg-primary/10 text-primary border-primary/20",
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-28 px-6 z-10">
      <div className="max-w-3xl mx-auto">
        <RevealSection>
          <p className="font-mono text-primary text-sm mb-3 tracking-wider"># projects</p>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-12 leading-tight">
            Selected{" "}
            <span className="text-gradient">work.</span>
          </h3>
        </RevealSection>

        <div className="grid gap-5">
          {projects.map((project, i) => (
            <RevealSection key={project.title} delay={i * 0.1}>
              <div className="border border-border rounded-xl p-7 bg-card card-hover group cursor-pointer">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-mono text-xs text-muted-foreground">
                    <span className="text-primary">projects</span>[{i}] = {"{"}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <h4 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2 pl-5">
                  "{project.title}"
                </h4>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed pl-5">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap pl-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2.5 py-1 rounded-md bg-muted text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="font-mono text-xs text-muted-foreground mt-4">{"}"}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
