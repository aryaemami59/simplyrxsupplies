import { FC, memo } from "react";
import { VendorNameType } from "../../../../customTypes/types";
import {
  selectQRText,
  selectQRCodeContent,
} from "../../../../Redux/selectors";
import { useAppSelector } from "../../../../Redux/hooks";

type Props = {
  vendorName: VendorNameType;
  className?: string;
};

const QRCodeImage: FC<Props> = ({ vendorName, className }) => {
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
