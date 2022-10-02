import { Offcanvas, Navbar } from "react-bootstrap";
import {
  useState,
  useCallback,
  memo,
  useContext,
  FC,
  MouseEventHandler,
} from "react";
import { DarkMode } from "../../../App";
import OffcanvasBodyContent from "./OffcanvasBodyContent";

const OffcanvasComponent: FC = (): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const [show, setShow] = useState(false);

  const handleOpen: MouseEventHandler<HTMLElement> = useCallback(() => {
    setShow(true);
  }, []);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  const theme = darkTheme ? "text-bg-dark" : "text-bg-light";

  return (
    <>
      <Navbar.Toggle
        key={`Navbar.Toggle-OffcanvasComponent`}
        className="d-lg-none mx-4 navbar-toggler"
        onClick={handleOpen}
      />
      <Offcanvas
        className={theme}
        key={`Offcanvas-OffcanvasComponent`}
        show={show}
        scroll
        onHide={handleClose}>
        <Offcanvas.Header
          closeButton
          closeVariant="white"
          key={`Offcanvas.Header-OffcanvasComponent`}>
          <Offcanvas.Title key={`Offcanvas.Title-OffcanvasComponent-Add Items`}>
            Add Items
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <OffcanvasBodyContent />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default memo(OffcanvasComponent);
