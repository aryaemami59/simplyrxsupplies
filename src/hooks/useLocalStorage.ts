import type { Dispatch, SetStateAction } from "react"
import { useEffect, useState } from "react"

/**
 * Retrieves a value from {@linkcode localStorage} by {@linkcode key}.
 * If no stored value exists, returns the result of calling
 * {@linkcode initialValue()} (when it is a function) or
 * {@linkcode initialValue} directly.
 *
 * @param key - The {@linkcode localStorage} key to look up.
 * @param initialValue - The fallback value or factory function used when no stored value is found.
 * @returns The stored value if present, otherwise the resolved {@linkcode initialValue}.
 */
// TODO: fix typing so it can handle non-string values too
const getSavedValue =
  /**
   * @template InitialValueType - The string type of the stored value.
   */
  <InitialValueType extends string>(
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
 * Synchronizes a React state value with {@linkcode localStorage}.
 * On mount the state is initialized from the stored value (via
 * {@linkcode getSavedValue()}). Whenever the state changes the new value is
 * written back to {@linkcode localStorage} under {@linkcode key}.
 *
 * @param key - The {@linkcode localStorage} key to read from and write to.
 * @param initialValue - The fallback value or factory function used when no stored value is found.
 * @returns A tuple of the current value and its setter, matching the {@linkcode useState} signature.
 */
// TODO: fix typing so it can handle non-string values too
export const useLocalStorage =
  /**
   * @template InitialValueType - The string type of the stored value.
   */
  <InitialValueType extends string>(
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
