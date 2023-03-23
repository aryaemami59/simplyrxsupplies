import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import printJS from "print-js";
import PropTypes from "prop-types";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback, useState } from "react";
import useItemName from "../../../hooks/useItemName";
import { useAppSelector } from "../../../Redux/hooks";
import { selectItemSrc } from "../../../Redux/selectors";

type Props = {
  header: string;
};

const startIcon = <FontAwesomeIcon icon={faPrint} />;

const title = "Print Barcode";

const PrintBarcodeIcon: FC<Props> = ({ header }) => {
  const [open, setOpen] = useState(false);
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

  const showTooltip = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Tooltip
      onOpen={showTooltip}
      onClose={hideTooltip}
      enterDelay={500}
      enterNextDelay={500}
      title={title}
      open={open}>
      <IconButton
        size="small"
        onClick={clickHandler}
        className="d-inline-block w-auto">
        {startIcon}
      </IconButton>
    </Tooltip>
  );
};

PrintBarcodeIcon.propTypes = {
  header: PropTypes.string.isRequired,
};

export default memo<Props>(PrintBarcodeIcon);
