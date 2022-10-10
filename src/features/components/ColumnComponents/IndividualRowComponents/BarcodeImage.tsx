import { FC, memo } from "react";
import { ItemName } from "../../../../customTypes/types";
import { selectItemSrc } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";

type Props = {
  itemName: ItemName;
  className?: string;
};

const BarcodeImage: FC<Props> = ({ itemName, className }) => {
  const src = useAppSelector(selectItemSrc(itemName));

  return (
    <img
      src={src}
      alt={itemName}
      className={`${className} barcode-image`}
    />
  );
};

export default memo<Props>(BarcodeImage);
