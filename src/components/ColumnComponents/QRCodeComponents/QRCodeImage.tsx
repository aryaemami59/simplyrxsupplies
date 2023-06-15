import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";

import useVendorName from "../../../hooks/useVendorName";
import { useAppSelector } from "../../../redux/hooks";
import { selectQRCodeContent, selectQRText } from "../../../redux/selectors";

type Props = {
  className?: string;
};

const QRCodeImage: FC<Props> = ({ className }) => {
  const vendorName = useVendorName();
  const title = useAppSelector(selectQRText(vendorName));
  const src = useAppSelector(selectQRCodeContent(vendorName));

  return (
    <img
      alt={`${vendorName} QRCode`}
      className={`${className ?? ""}`}
      src={src}
      title={title}
    />
  );
};

QRCodeImage.defaultProps = {
  className: undefined,
};

QRCodeImage.propTypes = {
  className: PropTypes.string,
};

export default memo<Props>(QRCodeImage);
