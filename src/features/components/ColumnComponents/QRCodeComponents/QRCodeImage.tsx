import { FC, memo } from "react";
import { vendorNameType } from "../../../../customTypes/types";

type Props = {
  src: string;
  title: string;
  vendorName: vendorNameType;
  className?: string;
};

const QRCodeImage: FC<Props> = ({ src, title, vendorName, className }) => {
  return (
    <>
      <img
        src={src}
        className={`${className}`}
        alt={`${vendorName}-QRCode`}
        title={title}
      />
    </>
  );
};

export default memo<Props>(QRCodeImage);
