// src/shared/hooks/useProgressiveLoading.ts
import { useState, useEffect } from 'react';

interface UseProgressiveLoadingOptions {
  messages: string[];
  intervalMs?: number;
  isLoading: boolean;
}

export function useProgressiveLoading({
  messages,
  intervalMs = 1200,
  isLoading,
}: UseProgressiveLoadingOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      // Reset index when loading completes so it starts fresh next time
      const resetTimer = setTimeout(() => setCurrentIndex(0), 200);
      return () => clearTimeout(resetTimer);
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isLoading, messages, intervalMs]);

  return {
    currentMessage: messages[currentIndex] || messages[0],
    progressStep: currentIndex + 1,
    totalSteps: messages.length,
  };
}