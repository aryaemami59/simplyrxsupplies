import type { Dispatch, SetStateAction } from "react"
import { useEffect, useState } from "react"

const getSavedValue = (
  key: string,
  initialValue: string | (() => string),
): string => {
  const savedValue = localStorage.getItem(key)
  if (savedValue != null) return savedValue
  if (initialValue instanceof Function) return initialValue()
  return initialValue
}

export const useLocalStorage = (
  key: string,
  initialValue: string | (() => string),
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue))

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}
