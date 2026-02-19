import { toDataURL } from "qrcode"
import { createContext, useEffect, useState } from "react"
import { useQRCodeText } from "../redux/selectors.js"
import type { ItemIdAndVendorId } from "../types/reduxHelperTypes.js"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

const createQRCode = async (text: string) => {
  try {
    return await toDataURL(text)
  } catch (error) {
    console.error("error", error)
    throw error
  }
}

type Props = PropsWithRequiredChildren<Pick<ItemIdAndVendorId, "vendorId">>

export const QRCodeDataContext = createContext<string | undefined>(undefined)

export const QRCodeDataProvider = ({ children, vendorId }: Props) => {
  const qrCodeText = useQRCodeText(vendorId)

  const [src, setSrc] = useState<string | undefined>(undefined)

  useEffect(() => {
    const setQRCode = async () => {
      const data = await createQRCode(qrCodeText)

      setSrc(data)
    }

    void setQRCode()
  }, [qrCodeText])

  return <QRCodeDataContext value={src}>{children}</QRCodeDataContext>
}
