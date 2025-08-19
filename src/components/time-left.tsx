import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function TimeLeft({ expiresAt }: { expiresAt: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  function calculateTimeLeft(expiresAt: string): TimeLeft | null {
    const expiresAtDate = new Date(expiresAt);
    const now = new Date();
    const differenceInMillisencods = expiresAtDate.getTime() - now.getTime();

    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    const hourInMilliseconds = 1000 * 60 * 60;
    const minuteInMilliseconds = 1000 * 60;

    if (differenceInMillisencods <= 0) {
      return null;
    }

    const hours = Math.floor(
      (differenceInMillisencods % dayInMilliseconds) / hourInMilliseconds,
    );
    const minutes = Math.floor(
      (differenceInMillisencods % hourInMilliseconds) / minuteInMilliseconds,
    );
    const seconds = Math.floor(
      (differenceInMillisencods % minuteInMilliseconds) / 1000,
    );

    return { hours, minutes, seconds };
  }

  function formatTimeLeft(timeLeft: TimeLeft): string {
    const parts = [];

    if (timeLeft.hours > 0) {
      parts.push(`${timeLeft.hours}h`);
    }

    if (timeLeft.minutes > 0) {
      parts.push(`${timeLeft.minutes}m`);
    }

    if (timeLeft.seconds > 0) {
      parts.push(`${timeLeft.seconds}s`);
    }

    return parts.join(" ");
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft(expiresAt);

      if (!remaining) {
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    const initialTime = calculateTimeLeft(expiresAt);
    setTimeLeft(initialTime);

    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <div className="flex items-center justify-center gap-2">
      <Clock width={16} />
      <p className="italic">{`${timeLeft && formatTimeLeft(timeLeft)}`}</p>
    </div>
  );
}
