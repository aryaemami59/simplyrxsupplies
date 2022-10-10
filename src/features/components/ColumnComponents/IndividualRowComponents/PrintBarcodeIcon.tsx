import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import printJS from "print-js";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { ItemName } from "../../../../customTypes/types";
import { selectItemSrc } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";

type Props = {
  text: string;
  header: string;
  itemName: ItemName;
};

const PrintBarcodeIcon: FC<Props> = ({ text, header, itemName }) => {
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
      startIcon={<FontAwesomeIcon icon={faPrint} />}
      onClick={clickHandler}
      className="w-auto">
      Print Barcode
    </Button>
  );
};

export default memo<Props>(PrintBarcodeIcon);
