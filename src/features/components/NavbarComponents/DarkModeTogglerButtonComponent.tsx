import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { memo, useCallback, useContext, FC } from "react";
import { DarkMode } from "../../../App";

const DarkModeTogglerButtonComponent: FC = (): JSX.Element => {
  const { setDarkTheme, darkTheme } = useContext(DarkMode);

  const clickHandler = useCallback(() => {
    // setDarkTheme(prev => !prev);
    setDarkTheme((prev: boolean) => {
      !prev
        ? localStorage.setItem("theme", (!prev).toString())
        : localStorage.removeItem("theme");
      return !prev;
    });
  }, [setDarkTheme]);

  return (
    <Button onClick={clickHandler}>
      <FontAwesomeIcon
        size="lg"
        inverse={darkTheme ? true : false}
        pull="right"
        key={`FontAwesomeIcon-NavbarComponent`}
        icon={faCircleHalfStroke}
      />
    </Button>
  );
};

export default memo(DarkModeTogglerButtonComponent);
