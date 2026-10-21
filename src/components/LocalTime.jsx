"use client";
import { useSyncExternalStore } from "react";
import { profile } from "@/data/content";

const fmt = new Intl.DateTimeFormat("en-CA", { hour: "numeric", minute: "2-digit", timeZone: profile.timeZone });
const hourIn = new Intl.DateTimeFormat("en-CA", { hour: "numeric", hourCycle: "h23", timeZone: profile.timeZone });

// What I'm probably doing, by Calgary hour. Probably.
export function guess(hour) {
  if (hour < 6) return "asleep, allegedly";
  if (hour < 9) return "out for a run";
  if (hour < 12) return "deep in an editor";
  if (hour < 13) return "lunch";
  if (hour < 18) return "shipping things";
  if (hour < 21) return "playing bass too loud";
  return "one more commit";
}

const subscribe = (cb) => {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
};
const minute = () => Math.floor(Date.now() / 60_000);

export default function LocalTime({ className = "" }) {
  const now = useSyncExternalStore(subscribe, minute, () => null);
  if (now === null) return <span className={className} aria-hidden />;
  const date = new Date(now * 60_000);
  return (
    <span className={className}>
      <span className="sr-only">Local time in Calgary: </span>
      YYC {fmt.format(date)} · {guess(Number(hourIn.format(date)))}
    </span>
  );
}
