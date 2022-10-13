import { useEffect, useState } from "react";
const getSavedValue = <T>(key: string, initialValue: T | (() => T)): T => {
  const savedValue = JSON.parse(localStorage.getItem(key)!);
  if (savedValue) return savedValue;
  if (initialValue instanceof Function) {
    return initialValue();
  }
  return initialValue;
};

const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => getSavedValue(key, initialValue));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
