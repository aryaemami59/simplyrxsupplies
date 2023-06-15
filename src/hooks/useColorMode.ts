import { useContext } from "react";

import { ColorModeContext } from "../contexts/ColorModeProvider";

const useColorMode = () => useContext(ColorModeContext);

export default useColorMode;
