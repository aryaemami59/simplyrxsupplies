import { toDataURL } from "qrcode"
import { createContext, useEffect, useState } from "react"
import { useQRCodeText } from "../redux/selectors.js"
import type { ItemIdAndVendorId } from "../types/reduxHelperTypes.js"
import type { PropsWithRequiredChildren } from "../types/tsHelpers.js"

/**
 * Generates a QR code data URL from the given {@linkcode text} string using
 * the `qrcode` library.
 *
 * @param text - The text to encode into the QR code.
 * @returns A {@linkcode Promise | promise} that resolves to a base-64 data URL of the QR code image.
 * @throws An {@linkcode Error} when QR code generation fails.
 */
const createQRCode = async (text: string): Promise<string> => {
  try {
    return await toDataURL(text)
  } catch (error) {
    console.error("error", error)
    throw error
  }
}

type Props = PropsWithRequiredChildren<Pick<ItemIdAndVendorId, "vendorId">>

/**
 * React context that holds the base-64 data URL of the generated QR code
 * image for a vendor, or `undefined` while the QR code is still being
 * generated.
 *
 * @default undefined
 */
export const QRCodeDataContext = createContext<string | undefined>(undefined)

/**
 * Generates a QR code for the given vendor asynchronously and provides the
 * resulting data URL to its subtree via {@linkcode QRCodeDataContext}.
 * The QR code text is derived from the Redux store via
 * {@linkcode useQRCodeText}.
 *
 * @param children - The component subtree that will receive the QR code data.
 * @param vendorId - The ID of the vendor whose QR code should be generated.
 */
export const QRCodeDataProvider = ({ children, vendorId }: Props) => {
  const qrCodeText = useQRCodeText(vendorId)

  const [src, setSrc] = useState<string | undefined>(undefined)

  useEffect(() => {
    const setQRCode = async (): Promise<void> => {
      const data = await createQRCode(qrCodeText)

      setSrc(data)
    }

    void setQRCode()
  }, [qrCodeText])

  return <QRCodeDataContext value={src}>{children}</QRCodeDataContext>
}
