"use client";
import { useEffect, useState } from "react";

export default function LocalTime({ timeZone }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}
