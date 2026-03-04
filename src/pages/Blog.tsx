import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import NeuralBackground from "@/components/NeuralBackground";
import { getAllPosts } from "@/lib/posts";
import { useLang } from "@/contexts/LanguageContext";

const LangToggle = () => {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-1 font-mono text-sm border border-border rounded-md overflow-hidden">
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
    </div>
  );
};

const Blog = () => {
  const { lang } = useLang();
  const posts = getAllPosts(lang);

  return (
    <div className="min-h-screen bg-background bg-grid relative">
      <NeuralBackground />
      <Navbar />

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-start justify-between mb-12"
        >
          <div>
            <p className="font-mono text-sm text-primary mb-2">self.blog</p>
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-4">
              Writing
            </h1>
            <p className="text-foreground/80 text-lg">
              Notes on machine learning, research, and things I find interesting.
            </p>
          </div>
          <div className="mt-1 shrink-0">
            <LangToggle />
          </div>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border border-border rounded-lg p-12 text-center"
          >
            <p className="font-mono text-primary text-sm mb-3"># coming soon</p>
            <p className="text-foreground/80">Posts are on the way. Check back later.</p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block group border border-border hover:border-primary/40 rounded-lg p-6 transition-all duration-300 hover:bg-primary/5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs text-foreground/60">{post.date}</span>
                    {post.readingTime && (
                      <>
                        <span className="text-border">·</span>
                        <span className="font-mono text-xs text-foreground/60">
                          {post.readingTime}
                        </span>
                      </>
                    )}
                    {post.lang !== lang && (
                      <>
                        <span className="text-border">·</span>
                        <span className="font-mono text-xs text-foreground/40 italic">
                          ({post.lang.toUpperCase()} only)
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  )}

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
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
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Blog;
