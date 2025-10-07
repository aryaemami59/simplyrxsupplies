import * as QRCode from "qrcode"
import { createContext, memo, useEffect, useState } from "react"
import { useQRCodeText } from "../redux/selectors.js"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

const createQRCode = async (data: string) => {
  try {
    return await QRCode.toDataURL(data)
  } catch (error) {
    console.error("error", error)
    throw error
  }
}

type Props = PropsWithRequiredChildren<{
  readonly vendorId: number
}>

export const QRCodeDataContext = createContext<string | undefined>(undefined)

const QRCodeDataProvider = ({ children, vendorId }: Props) => {
  const qrCodeText = useQRCodeText(vendorId)

  const [src, setSrc] = useState<string | undefined>(undefined)

  useEffect(() => {
    const setQRCode = async () => {
      const data = await createQRCode(qrCodeText)
      setSrc(data)
    }

    void setQRCode()
  }, [qrCodeText])

  return (
    <QRCodeDataContext.Provider value={src}>
      {children}
    </QRCodeDataContext.Provider>
  )
}

export default memo(QRCodeDataProvider)
