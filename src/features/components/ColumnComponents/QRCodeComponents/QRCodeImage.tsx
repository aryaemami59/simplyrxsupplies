import { FC, memo } from "react";
import { useAppSelector } from "../../../../Redux/hooks";
import { selectQRCodeContent, selectQRText } from "../../../../Redux/selectors";
import useVendorName from "../../../customHooks/useVendorName";

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
      className={`${className}`}
      alt={`${vendorName} QRCode`}
      title={title}
    />
  );
};

export default memo<Props>(QRCodeImage);
