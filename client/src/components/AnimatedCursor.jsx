import { useEffect, useMemo, useState } from "react";

const JITTER_INTERVAL_MS = 130;
const JITTER_RANGE = 10;

const supportsCustomCursor = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const randomJitter = () => ({
  x: Math.floor(Math.random() * (JITTER_RANGE * 2 + 1)) - JITTER_RANGE,
  y: Math.floor(Math.random() * (JITTER_RANGE * 2 + 1)) - JITTER_RANGE
});

export default function AnimatedCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [jitter, setJitter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMediaChange = () => setEnabled(supportsCustomCursor());
    onMediaChange();

    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (media.addEventListener) {
      media.addEventListener("change", onMediaChange);
    } else {
      media.addListener(onMediaChange);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", onMediaChange);
      } else {
        media.removeListener(onMediaChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("custom-cursor-enabled");
      return;
    }

    document.body.classList.add("custom-cursor-enabled");
    return () => document.body.classList.remove("custom-cursor-enabled");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const onMouseMove = (event) => {
      setVisible(true);
      setPosition({ x: event.clientX, y: event.clientY });

      const target = event.target;
      const inContent = target.closest(".cursor-target");
      const inInteractive = target.closest("a, button, input, textarea, select, label");
      setActive(Boolean(inContent) && !inInteractive);
    };

    const onMouseLeave = () => {
      setVisible(false);
      setActive(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !active) {
      setJitter({ x: 0, y: 0 });
      return undefined;
    }

    const jitterTimer = window.setInterval(() => {
      setJitter(randomJitter());
    }, JITTER_INTERVAL_MS);

    return () => window.clearInterval(jitterTimer);
  }, [enabled, active]);

  const cursorStyle = useMemo(
    () => ({
      transform: `translate3d(${position.x + jitter.x}px, ${position.y + jitter.y}px, 0)`,
      opacity: visible ? 1 : 0
    }),
    [position, jitter, visible]
  );

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div className={`custom-cursor ${active ? "custom-cursor--active" : ""}`} style={cursorStyle} />
      <div className={`custom-cursor-dot ${active ? "custom-cursor-dot--active" : ""}`} style={cursorStyle} />
    </>
  );
}
