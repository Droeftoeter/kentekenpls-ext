import { useState, useEffect } from "react";

export default function useMatchMedia(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const update = (event: MediaQueryListEvent) => setMatches(event.matches);

    const media = window.matchMedia(query);
    media.addEventListener("change", update);

    setMatches(media.matches);

    return () => {
      media.removeEventListener("change", update);
    };
  }, [query]);

  return matches;
}
