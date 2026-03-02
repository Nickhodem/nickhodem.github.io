import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "pl" | "en";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
  lang: "pl",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("blog-lang");
    return stored === "en" || stored === "pl" ? stored : "pl";
  });

  const setLang = (l: Lang) => {
    localStorage.setItem("blog-lang", l);
    setLangState(l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
