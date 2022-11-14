import PropTypes from "prop-types";
import { FC, memo } from "react";
import useVendorName from "../../../hooks/useVendorName";
import { useAppSelector } from "../../../Redux/hooks";
import { selectQRText, selectQRCodeContent } from "../../../Redux/selectors";

type Props = {
  className?: string;
};

const QRCodeImage: FC<Props> = ({ className }) => {
  const vendorName = useVendorName();
  const title = useAppSelector(selectQRText(vendorName));
  const src = useAppSelector(selectQRCodeContent(vendorName));

  return (
    <img
      src={src}
      className={`${className ?? ""}`}
      alt={`${vendorName} QRCode`}
      title={title}
    />
  );
};

QRCodeImage.propTypes = {
  className: PropTypes.string,
};

export default memo<Props>(QRCodeImage);
