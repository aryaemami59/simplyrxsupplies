import { useEffect, useState } from "react";
const getSavedValue = (key: string, initialValue: string | (() => string)) => {
  const savedValue = JSON.parse(localStorage.getItem(key)!);
  if (savedValue) return savedValue;
  if (initialValue instanceof Function) {
    return initialValue();
  }
  return initialValue;
};

const useLocalStorage = (
  key: string,
  initialValue: string | (() => string)
) => {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
