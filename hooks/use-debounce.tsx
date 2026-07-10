import { useEffect, useState } from "react";

type Props = {
  value: string;
  delay: number;
};
export function useDebounce({ delay, value }: Props) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
}
