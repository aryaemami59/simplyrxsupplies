import { use } from "react"
import type { ColorModeContextType } from "../contexts/ColorModeProvider.js"
import { ColorModeContext } from "../contexts/ColorModeProvider.js"

/**
 * Reads the current {@linkcode ColorModeContext} value, providing the active
 * MUI {@linkcode ColorModeContextType.theme | theme} and the
 * {@linkcode ColorModeContextType.toggleColorMode | toggleColorMode} callback.
 *
 * @returns The current {@linkcode ColorModeContext} value.
 */
export const useColorMode = (): ColorModeContextType => use(ColorModeContext)
