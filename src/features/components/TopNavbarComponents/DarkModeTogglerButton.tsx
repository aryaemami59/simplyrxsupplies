import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, memo, MouseEventHandler, useCallback, useContext } from "react";
import { Button } from "react-bootstrap";
import { DarkMode } from "../../../App";

const DarkModeTogglerButton: FC = (): JSX.Element => {
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
      variant="">
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
