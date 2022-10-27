import PropTypes from "prop-types";
import { FC, memo } from "react";
import { useAppSelector } from "../../../../Redux/hooks";
import { selectItemSrc } from "../../../../Redux/selectors";
import useItemName from "../../../customHooks/useItemName";

type Props = {
  className?: string;
};

const BarcodeImage: FC<Props> = ({ className }) => {
  const itemName = useItemName();
  const src = useAppSelector(selectItemSrc(itemName));

  return (
    <img
      src={src}
      alt={itemName}
      className={`${className} barcode-image`}
    />
  );
};

BarcodeImage.propTypes = {
  className: PropTypes.string,
};

export default memo<Props>(BarcodeImage);
