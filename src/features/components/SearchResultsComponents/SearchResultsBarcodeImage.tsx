import { FC, memo } from "react";
import { ItemObjType } from "../../../customTypes/types";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsBarcodeImage: FC<Props> = ({ itemObj }): JSX.Element => {
  return (
    <img
      key={`img-SearchResultsBarcodeImageComponent-${itemObj.name}`}
      src={itemObj.src}
      alt={`${itemObj.itemNumber}-${itemObj.name}`}
      className="flex-grow-0 flex-shrink-0 w-auto px-0 px-sm-2 px-lg-0 px-xl-2"
    />
  );
};

export default memo<Props>(SearchResultsBarcodeImage);
