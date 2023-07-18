import { useEffect, useRef } from "react";

export default function useClickOutsideShadowRoot<T extends Element>(
  onOutsideClick: () => void,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const rootNode = ref.current?.getRootNode();

      if (
        event.target instanceof Element &&
        rootNode instanceof ShadowRoot &&
        ref.current &&
        !rootNode.host.contains(event.target)
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [onOutsideClick]);

  return ref;
}
