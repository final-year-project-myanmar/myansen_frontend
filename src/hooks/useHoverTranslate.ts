import { useState, useRef } from "react";

const cache = new Map<string, string>();

export function useHoverTranslate() {
  const [translated, setTranslated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const translate = async (text: string) => {
    if (!text) return;
    if (cache.has(text)) {
      setTranslated(cache.get(text)!);
      return;
    }

    setLoading(true);
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const res = await fetch("http://localhost:8000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: ac.signal,
      });
      const data = await res.json();
      const eng = data.translatedText || "";
      cache.set(text, eng);
      setTranslated(eng);
    } catch (err) {
      setTranslated("(translation failed)");
    } finally {
      setLoading(false);
    }
  };

  return { translated, loading, translate };
}
