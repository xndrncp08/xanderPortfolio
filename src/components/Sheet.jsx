"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "motion/react";
import { FiX } from "react-icons/fi";

// Critically damped: no overshoot on a sheet that simply opens.
const SPRING = { type: "spring", bounce: 0, duration: 0.45 };
const MOBILE_QUERY = "(max-width: 639px)";

function useIsMobile() {
  return useSyncExternalStore(
    (cb) => {
      const mq = matchMedia(MOBILE_QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => matchMedia(MOBILE_QUERY).matches,
    () => false
  );
}

// Where a flick would come to rest, using scroll-style exponential deceleration.
function project(velocity, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * A modal sheet. Desktop: a centered card that grows out of the element that
 * opened it and returns along the same path. Mobile: a bottom sheet you can
 * drag down by its handle; a flick dismisses it.
 */
export default function Sheet({ open, onClose, origin, label, size = "md", children }) {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const panelRef = useRef(null);

  // Focus, scroll lock, background inertness and Escape — while open.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    const page = document.getElementById("page");
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    root.style.paddingRight = `${scrollbar}px`;
    if (page) page.inert = true;
    panelRef.current?.querySelector("[data-autofocus]")?.focus({ preventScroll: true });

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      root.style.paddingRight = "";
      if (page) page.inert = false;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  // Hint from the source: start offset toward the tile that was tapped.
  let hidden;
  if (reduceMotion) {
    hidden = { opacity: 0 };
  } else if (isMobile) {
    hidden = { y: typeof window === "undefined" ? 800 : window.innerHeight };
  } else {
    const dx = origin ? origin.x - window.innerWidth / 2 : 0;
    const dy = origin ? origin.y - window.innerHeight / 2 : 40;
    hidden = { opacity: 0, scale: 0.9, x: dx * 0.35, y: dy * 0.35 };
  }
  const shown = { opacity: 1, scale: 1, x: 0, y: 0 };

  const onDragEnd = (_, info) => {
    const height = panelRef.current?.offsetHeight ?? window.innerHeight;
    const restingPoint = info.offset.y + project(info.velocity.y);
    if (restingPoint > height * 0.4) onClose();
  };

  const width = size === "lg" ? "sm:max-w-[60rem]" : "sm:max-w-[44rem]";
  const height = size === "lg" ? "h-[92dvh] sm:h-[min(90dvh,64rem)]" : "max-h-[92dvh] sm:max-h-[88dvh]";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]" key="sheet">
          <motion.div
            className="absolute inset-0 bg-[var(--scrim)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center sm:items-center sm:p-6">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={label}
              initial={hidden}
              animate={shown}
              exit={hidden}
              transition={{ ...SPRING, opacity: { duration: 0.2, ease: "easeOut" } }}
              drag={isMobile ? "y" : false}
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.08, bottom: 1 }}
              dragTransition={{ bounceStiffness: 500, bounceDamping: 45 }}
              onDragEnd={onDragEnd}
              className={`pointer-events-auto relative flex w-full flex-col overflow-hidden rounded-t-[28px] bg-bg dark:bg-[#1c1c1e] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.45)] sm:rounded-[28px] ${width} ${height}`}
            >
              {/* Drag handle (mobile) — the only area that starts a drag, so content can scroll. */}
              <div
                onPointerDown={(e) => isMobile && dragControls.start(e)}
                className="absolute inset-x-0 top-0 z-20 flex h-7 touch-none justify-center pt-2 sm:hidden"
              >
                <span className="h-1.5 w-10 rounded-full bg-fg/25" />
              </div>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                aria-label="Close"
                className="press glass absolute top-3 right-3 z-20 grid size-9 place-items-center rounded-full text-fg/80 hover:text-fg"
              >
                <FiX className="size-[18px]" />
              </button>
              {children({ startDrag: (e) => isMobile && dragControls.start(e) })}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
