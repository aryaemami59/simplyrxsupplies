import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./store.js"

/**
 * Pre-typed version of React-Redux's {@linkcode useDispatch()} hook, bound to
 * the store's {@linkcode AppDispatch} type.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

/**
 * Pre-typed version of React-Redux's {@linkcode useSelector()} hook, bound to
 * the application's {@linkcode RootState}.
 */
export const useAppSelector = useSelector.withTypes<RootState>()
