import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";

import useItemName from "../../../hooks/useItemName";
import { useAppSelector } from "../../../redux/hooks";
import { selectItemSrc } from "../../../redux/selectors";

type Props = {
  className?: string;
};

const BarcodeImage: FC<Props> = ({ className }) => {
  const itemName = useItemName();
  const src = useAppSelector(selectItemSrc(itemName));

  return (
    <img
      alt={itemName}
      className={`${className ?? ""} barcode-image`}
      src={src}
    />
  );
};

BarcodeImage.defaultProps = {
  className: undefined,
};

BarcodeImage.propTypes = {
  className: PropTypes.string,
};

export default memo<Props>(BarcodeImage);
