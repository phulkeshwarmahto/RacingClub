import { useEffect, useMemo, useRef, useState } from "react";

const SPEED_THRESHOLD = 0.35;
const SPEED_DECAY_STEP = 0.05;
const SPEED_DECAY_INTERVAL = 50;
const MAX_EXPECTED_PX_PER_SEC = 1800;

const supportsCustomCursor = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const normalizeSpeed = (pixelsPerSecond) => Math.min(1, pixelsPerSecond / MAX_EXPECTED_PX_PER_SEC);

export default function AnimatedCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState(1);
  const previousPointRef = useRef({ x: 0, y: 0, t: 0, ready: false });

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
      const now = performance.now();
      setVisible(true);
      setPosition({ x: event.clientX, y: event.clientY });

      const previous = previousPointRef.current;
      if (previous.ready) {
        const dx = event.clientX - previous.x;
        const dy = event.clientY - previous.y;
        const dt = Math.max(1, now - previous.t);
        const pxPerSec = (Math.hypot(dx, dy) * 1000) / dt;
        setSpeed(normalizeSpeed(pxPerSec));

        if (Math.abs(dx) > 1.2) {
          setDirection(dx > 0 ? 1 : -1);
        }
      }

      previousPointRef.current = { x: event.clientX, y: event.clientY, t: now, ready: true };

      const target = event.target;
      const inContent = target.closest(".cursor-target");
      const inInteractive = target.closest("a, button, input, textarea, select, label");
      setActive(Boolean(inContent) && !inInteractive);
    };

    const onMouseOut = (event) => {
      if (event.relatedTarget || event.toElement) {
        return;
      }

      setVisible(false);
      setActive(false);
      setSpeed(0);
      previousPointRef.current = { x: 0, y: 0, t: 0, ready: false };
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !visible) {
      return undefined;
    }

    const decayTimer = window.setInterval(() => {
      setSpeed((current) => Math.max(0, current - SPEED_DECAY_STEP));
    }, SPEED_DECAY_INTERVAL);

    return () => window.clearInterval(decayTimer);
  }, [enabled, visible]);

  const isAccelerating = active && speed > SPEED_THRESHOLD;

  const cursorStyle = useMemo(
    () => ({
      transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scaleX(${direction})`,
      opacity: visible ? 1 : 0,
      "--speed-factor": speed.toFixed(3)
    }),
    [position, direction, speed, visible]
  );

  if (!enabled) {
    return null;
  }

  return (
    <div
      className={`car-cursor ${active ? "car-cursor--active" : ""} ${isAccelerating ? "car-cursor--accelerating" : ""}`}
      style={cursorStyle}
    >
      <div className="car-cursor__trail">
        <span />
        <span />
        <span />
      </div>
      <div className="car-cursor__exhaust" />
      <svg className="car-cursor__body" viewBox="0 0 96 48" aria-hidden="true" focusable="false">
        <path d="M14 33c-4 0-7-3-7-7v-5c0-4 3-7 7-7h10l8-8h28l7 8h10c4 0 7 3 7 7v5c0 4-3 7-7 7h-4a10 10 0 0 1-19 0H42a10 10 0 0 1-19 0h-9z" />
        <circle cx="31" cy="33" r="6.5" />
        <circle cx="64" cy="33" r="6.5" />
        <rect x="35" y="10" width="24" height="9" rx="2.2" />
      </svg>
    </div>
  );
}
