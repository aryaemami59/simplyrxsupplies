import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";
import useItemName from "../../../hooks/useItemName";
import { useAppSelector } from "../../../Redux/hooks";
import { selectItemSrc } from "../../../Redux/selectors";

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
      className={`${className ?? ""} barcode-image`}
    />
  );
};

BarcodeImage.propTypes = {
  className: PropTypes.string,
};

export default memo<Props>(BarcodeImage);
