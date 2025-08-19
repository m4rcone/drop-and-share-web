import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function TimeLeft({ expiresAt }: { expiresAt: string }) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  function calculateTimeLeft(expiresAt: string): TimeLeft | null {
    const expiresAtDate = new Date(expiresAt).getTime();
    const now = Date.now();

    const diff = Math.max(0, expiresAtDate - now);

    if (diff <= 0) {
      return null;
    }

    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    const hourInMilliseconds = 1000 * 60 * 60;
    const minuteInMilliseconds = 1000 * 60;

    const hours = Math.floor((diff % dayInMilliseconds) / hourInMilliseconds);
    const minutes = Math.floor(
      (diff % hourInMilliseconds) / minuteInMilliseconds
    );
    const seconds = Math.floor((diff % minuteInMilliseconds) / 1000);

    return { hours, minutes, seconds };
  }

  useEffect(() => {
    setMounted(true);
    let timeout: NodeJS.Timeout;

    function tick() {
      const remaining = calculateTimeLeft(expiresAt);
      setTimeLeft(remaining);

      if (remaining) {
        timeout = setTimeout(tick, 1000);
      }
    }

    tick();

    return () => clearTimeout(timeout);
  }, [expiresAt]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Clock width={16} />
      <p className="italic">
        {timeLeft &&
          `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
      </p>
    </div>
  );
}
