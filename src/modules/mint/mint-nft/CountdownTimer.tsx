"use client";

import { useState, useEffect } from "react";
import { cn } from "@/shared/utils/tailwind-utils";

interface CountdownTimerProps {
  endTime: string;
  onEnd: () => void;
  isLive?: boolean;
}

const CountdownTimer = ({ endTime, onEnd, isLive = false }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!endTime) return;
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();

      if (difference <= 0) {
        onEnd();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
        onEnd();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onEnd]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const timeText = `${formatNumber(timeLeft.days)} days, ${formatNumber(
    timeLeft.hours
  )} hours, ${formatNumber(timeLeft.minutes)} minutes, ${formatNumber(timeLeft.seconds)} seconds`;

  return (
    <div
      className={cn("flex space-x-1", timeLeft.minutes < 5 && isLive && "animate-pulse")}
      aria-live="polite"
      aria-label={isLive ? `Mint ends in ${timeText}` : `Mint starts in ${timeText}`}
    >
      {["days", "hours", "minutes", "seconds"].map(unit => (
        <div
          key={unit}
          className={`w-10 h-6 flex items-center justify-center rounded text-sm ${
            isLive
              ? "bg-pink-600/20 text-pink-400 border border-pink-600/50 dark:bg-pink-700/20 dark:text-pink-300 dark:border-pink-700/50"
              : "bg-gray-200/80 text-gray-600 border border-gray-300/50 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-800/50"
          }`}
        >
          <span className="text-sm">{formatNumber(timeLeft[unit as keyof typeof timeLeft])}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
