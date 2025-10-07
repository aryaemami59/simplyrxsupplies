import { useContext } from "react"
import { ColorModeContext } from "../contexts/ColorModeProvider.js"

export const useColorMode = () => useContext(ColorModeContext)
