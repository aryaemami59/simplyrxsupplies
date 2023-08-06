import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

const getSavedValue = <T extends string | (() => string) = string>(
  key: string,
  initialValue: T
): string => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) return savedValue;
  if (initialValue instanceof Function) return initialValue();
  return initialValue as Extract<T, string>;
};

const useLocalStorage = <T extends string | (() => string) = string>(
  key: string,
  initialValue: T
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState(() => getSavedValue<T>(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
