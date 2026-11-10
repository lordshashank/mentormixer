'use client';

import { useState, useEffect, useRef } from 'react';

interface UseTimerOptions {
  initialDuration: number; // seconds
  onComplete?: () => void;
}

type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export function useTimer({ initialDuration, onComplete }: UseTimerOptions) {
  const [remaining, setRemaining] = useState(initialDuration);
  const [state, setState] = useState<TimerState>('idle');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = () => {
    if (state === 'idle' || state === 'paused') {
      setState('running');
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }
  };

  // Completion lives outside the state updater so StrictMode's double-invoke can't fire it twice.
  useEffect(() => {
    if (state === 'running' && remaining === 0) {
      clear();
      setState('completed');
      onCompleteRef.current?.();
    }
  }, [state, remaining]);

  const stop = () => {
    if (state === 'running') {
      setState('paused');
      clear();
    }
  };

  const reset = () => {
    setState('idle');
    setRemaining(initialDuration);
    clear();
  };

  useEffect(() => clear, []);

  return { remaining, state, start, stop, reset };
}
