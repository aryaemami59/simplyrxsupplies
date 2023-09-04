import QRCode from "qrcode";
import type { FC } from "react";
import { createContext, memo, useEffect, useState } from "react";

import { useAppSelector } from "../redux/hooks";
import { selectQRCodeText } from "../redux/selectors";
import type { PropsWithRequiredChildren } from "../types/tsHelpers";

const createQRCode = async <const S extends string>(data: S) => {
  try {
    return await QRCode.toDataURL(data);
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

type Props = PropsWithRequiredChildren<{
  readonly vendorId: number;
}>;

export const QRCodeDataContext = createContext<string>("");

const QRCodeDataProvider: FC<Props> = ({ children, vendorId }) => {
  const qrCodeText = useAppSelector(state => selectQRCodeText(state, vendorId));
  const [src, setSrc] = useState("");
  useEffect(() => {
    const setQRCode = async () => {
      const data = await createQRCode(qrCodeText);
      setSrc(data);
    };
    void setQRCode();
  }, [qrCodeText]);

  return (
    <QRCodeDataContext.Provider value={src}>
      {children}
    </QRCodeDataContext.Provider>
  );
};

export default memo<Props>(QRCodeDataProvider);
