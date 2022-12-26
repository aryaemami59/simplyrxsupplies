import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

// type ObjType<T> = T extends AnyObject
//   ? EmptyObject
//   : T extends AnyArray
//   ? EmptyArray
//   : string;

const getSavedValue = <P = null, T extends string | (() => string) = string>(
  key: string,
  initialValue: T
) => {
  const value = localStorage.getItem(key);
  const savedValue = value ? (JSON.parse(value) as NonNullable<P>) : null;
  if (savedValue) return savedValue;
  if (initialValue instanceof Function) return initialValue();
  return initialValue as Extract<T, string>;
};

const useLocalStorage = <P = null, T extends string | (() => string) = string>(
  key: string,
  initialValue: T
): [
  string | NonNullable<P>,
  Dispatch<SetStateAction<string | NonNullable<P>>>
] => {
  const [value, setValue] = useState(() =>
    getSavedValue<P, T>(key, initialValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
