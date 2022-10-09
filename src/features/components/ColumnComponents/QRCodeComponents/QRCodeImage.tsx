import src from "print-js";
import { FC, memo } from "react";
import { vendorNameType } from "../../../../customTypes/types";
import { numbersOnQR, selectQRCodeContent } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";

type Props = {
  // src: string;
  // title: string;
  vendorName: vendorNameType;
  className?: string;
};

const QRCodeImage: FC<Props> = ({ vendorName, className }) => {
  const title = useAppSelector(numbersOnQR(vendorName));
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
