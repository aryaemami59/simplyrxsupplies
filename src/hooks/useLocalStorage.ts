import type { Dispatch, SetStateAction } from "react"
import { useEffect, useState } from "react"

/**
 * @todo fix typing so it can handle non-string values too
 */
const getSavedValue = <T extends string>(
  key: string,
  initialValue: (() => T) | T,
): T => {
  const savedValue = localStorage.getItem(key)

  if (savedValue != null) {
    return savedValue as T
  }

  if (typeof initialValue === "function") {
    return initialValue()
  }

  return initialValue
}

/**
 * @todo fix typing so it can handle non-string values too
 */
export const useLocalStorage = <T extends string>(
  key: string,
  initialValue: (() => T) | T,
): [value: T, setValue: Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue))

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue] as const
}
