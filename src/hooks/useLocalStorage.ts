import type { Dispatch, SetStateAction } from "react"
import { useEffect, useState } from "react"

/**
 * @todo fix typing so it can handle non-string values too
 */
const getSavedValue = <InitialValueType extends string>(
  key: string,
  initialValue: (() => InitialValueType) | InitialValueType,
): InitialValueType => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const savedValue = localStorage?.getItem?.(key)

  if (savedValue != null) {
    return savedValue as InitialValueType
  }

  if (typeof initialValue === "function") {
    return initialValue()
  }

  return initialValue
}

/**
 * @todo fix typing so it can handle non-string values too
 */
export const useLocalStorage = <InitialValueType extends string>(
  key: string,
  initialValue: (() => InitialValueType) | InitialValueType,
): [
  value: InitialValueType,
  setValue: Dispatch<SetStateAction<InitialValueType>>,
] => {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue))

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    localStorage?.setItem?.(key, value)
  }, [key, value])

  return [value, setValue] as const
}
