import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import NeuralBackground from "@/components/NeuralBackground";
import { getPostBySlug } from "@/lib/posts";
import { useLang, type Lang } from "@/contexts/LanguageContext";

const LangToggle = () => {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 font-mono text-sm border border-border rounded-md overflow-hidden">
      <button
        onClick={() => setLang("pl")}
        className={`px-3 py-1.5 transition-colors ${
          lang === "pl"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-primary"
        }`}
      >
        PL
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 transition-colors ${
          lang === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-primary"
        }`}
      >
        EN
      </button>
    </div>
  );
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const post = slug ? getPostBySlug(slug, lang) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background bg-grid relative">
        <NeuralBackground />
        <Navbar />
        <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24 text-center">
          <p className="font-mono text-primary text-sm mb-4">404</p>
          <h1 className="text-3xl font-bold font-heading mb-4">Post not found</h1>
          <Link
            to="/blog"
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← back to blog
          </Link>
        </main>
      </div>
    );
  }

  const isFallback = post.lang !== lang;
  const fallbackLang: Lang = lang === "pl" ? "en" : "pl";

  return (
    <div className="min-h-screen bg-background bg-grid relative">
      <NeuralBackground />
      <Navbar />

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              back to blog
            </Link>
            <LangToggle />
          </div>

          {isFallback && (
            <div className="mb-6 px-4 py-3 rounded-lg border border-border bg-primary/5 font-mono text-xs text-muted-foreground">
              {lang === "pl"
                ? `Ten wpis nie ma jeszcze wersji polskiej. Wyświetlam wersję ${fallbackLang.toUpperCase()}.`
                : `This post doesn't have an ${lang.toUpperCase()} version yet. Showing ${fallbackLang.toUpperCase()}.`}
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
            {post.readingTime && (
              <>
                <span className="text-border">·</span>
                <span className="font-mono text-xs text-muted-foreground">{post.readingTime}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight mb-4">
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="border-t border-border pt-10">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold font-heading mt-8 mb-4 text-foreground">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold font-heading mt-8 mb-4 text-foreground">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold font-heading mt-6 mb-3 text-foreground">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-relaxed mb-5">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="text-foreground font-semibold">{children}</strong>
                ),
                em: ({ children }) => <em className="text-foreground italic">{children}</em>,
                hr: () => <hr className="border-border my-8" />,
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-muted-foreground mb-5 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-muted-foreground mb-5 space-y-1">{children}</ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                code: ({ children }) => (
                  <code className="font-mono text-sm bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                    {children}
                  </code>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-primary/40 pl-4 italic text-muted-foreground my-5">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default BlogPost;
