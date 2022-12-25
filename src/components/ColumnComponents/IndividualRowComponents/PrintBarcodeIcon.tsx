import PropTypes from "prop-types";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import printJS from "print-js";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback } from "react";
import useItemName from "../../../hooks/useItemName";
import { useAppSelector } from "../../../Redux/hooks";
import { selectItemSrc } from "../../../Redux/selectors";

type Props = {
  header: string;
};

const startIcon = <FontAwesomeIcon icon={faPrint} />;

const PrintBarcodeIcon: FC<Props> = ({ header }) => {
  const itemName = useItemName();
  const src = useAppSelector(selectItemSrc(itemName));

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    printJS({
      printable: src,
      type: "image",
      header,
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [header, src]);

  return (
    <Button
      variant="contained"
      startIcon={startIcon}
      onClick={clickHandler}
      className="w-auto">
      Print Barcode
    </Button>
  );
};

PrintBarcodeIcon.propTypes = {
  header: PropTypes.string.isRequired,
};

export default memo<Props>(PrintBarcodeIcon);
