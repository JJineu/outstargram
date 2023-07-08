import { useEffect, useState } from 'react';

export default function useThrottle(value: string, interval: number = 1000) {
  const [throttle, setThrottle] = useState(value);

  useEffect(() => {
    const handler = setInterval(() => setThrottle(value), interval);
    return () => clearTimeout(handler);
  }, [value, interval]);
  return throttle;
}
