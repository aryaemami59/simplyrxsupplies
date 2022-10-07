import { FC, memo } from "react";
import { ItemObjType } from "../../../../customTypes/types";

type Props = {
  itemObj: ItemObjType;
  className?: string;
};

const BarcodeImage: FC<Props> = ({ itemObj, className }) => {
  return (
    <img
      src={itemObj.src}
      alt={itemObj.name}
      className={className}
    />
  );
};

export default memo<Props>(BarcodeImage);
