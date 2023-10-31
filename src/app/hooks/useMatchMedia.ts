import { useMemo, useSyncExternalStore } from "react";

function createMatchMediaStore(query: string) {
  const mql = window.matchMedia(query);

  return {
    subscribe: (callback: () => void) => {
      mql.addEventListener("change", callback);

      return () => {
        mql.removeEventListener("change", callback);
      };
    },
    getSnapshot: () => mql.matches,
  };
}

export default function useMatchMedia(query: string): boolean {
  const store = useMemo(() => createMatchMediaStore(query), [query]);

  return useSyncExternalStore(store.subscribe, store.getSnapshot);
}
