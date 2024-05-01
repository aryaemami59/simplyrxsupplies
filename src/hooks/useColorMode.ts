import { useContext } from "react"

import { ColorModeContext } from "../contexts/ColorModeProvider"

export const useColorMode = () => useContext(ColorModeContext)
