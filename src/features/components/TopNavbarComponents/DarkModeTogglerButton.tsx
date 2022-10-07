import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useContext } from "react";
import { DarkMode } from "../../../App";

const DarkModeTogglerButton: FC = () => {
  const { setDarkTheme, darkTheme } = useContext(DarkMode);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setDarkTheme(prev => {
      !prev
        ? localStorage.setItem("theme", (!prev).toString())
        : localStorage.removeItem("theme");
      return !prev;
    });
  }, [setDarkTheme]);

  const inverse = darkTheme ? true : false;

  return (
    <Button
      onClick={clickHandler}
      variant="contained">
      <FontAwesomeIcon
        size="lg"
        inverse={inverse}
        pull="right"
        key={`FontAwesomeIcon-NavbarComponent`}
        icon={faCircleHalfStroke}
      />
    </Button>
  );
};

export default memo(DarkModeTogglerButton);
