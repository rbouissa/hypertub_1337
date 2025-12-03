import { useEffect, useState, useRef } from 'react';

interface Props {
  value: number;
  duration?: number; // milliseconds
}

export function AnimatedNumber({ value, duration = 1000 }: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const frameId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    setDisplayValue(0);         // Reset to 0 on every change
    startTime.current = null;   // Reset start time

    // Animation function
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;

      if (elapsed < duration) {
        // Calculate progress (from 0 to value)
        const progress = Math.round((elapsed / duration) * value);
        setDisplayValue(progress);
        frameId.current = requestAnimationFrame(animate);
      } else {
        // Finish at exact value
        setDisplayValue(value);
      }
    };

    frameId.current = requestAnimationFrame(animate);

    // Cleanup on unmount or value change
    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      startTime.current = null;
    };
  }, [value, duration]);

  return <span>{displayValue}</span>;
}

