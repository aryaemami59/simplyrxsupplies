import { use } from "react"
import { ColorModeContext } from "../contexts/ColorModeProvider.js"

export const useColorMode = () => use(ColorModeContext)
