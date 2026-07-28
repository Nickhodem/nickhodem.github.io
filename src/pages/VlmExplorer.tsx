import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const VlmExplorer = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-14 px-6 flex items-center border-b border-border bg-background">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          back to home
        </Link>
      </div>
      <iframe
        title="VLM Explorer"
        src="/vlm-explorer-document.html"
        className="block w-full border-0"
        style={{ height: "calc(100vh - 3.5rem)" }}
      />
    </div>
  );
};

export default VlmExplorer;
