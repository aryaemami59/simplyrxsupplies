import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { memo, useCallback, useContext } from "react";
import { DarkMode } from "../../../App";

function DarkModeTogglerButtonComponent() {
  const { setDarkTheme, darkTheme } = useContext(DarkMode);

  const clickHandler = useCallback(() => {
    setDarkTheme(prev => !prev);
  }, [setDarkTheme]);

  return (
    <Button onClick={clickHandler} variant>
      <FontAwesomeIcon
        size="lg"
        inverse={darkTheme ? true : false}
        pull="right"
        key={`FontAwesomeIcon-NavbarComponent`}
        icon={faCircleHalfStroke}
      />
    </Button>
  );
}

export default memo(DarkModeTogglerButtonComponent);