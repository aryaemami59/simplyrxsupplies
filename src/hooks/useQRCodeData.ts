import type { ContextType } from "react"
import { use } from "react"
import { QRCodeDataContext } from "../contexts/QRCodeDataProvider.js"

/**
 * Reads the current {@linkcode QRCodeDataContext} value, which holds the
 * base-64 data URL of the generated QR code image, or `undefined` while the
 * QR code is still being generated.
 *
 * @returns The QR code data URL string, or `undefined` when not yet available.
 */
export const useQRCodeData = (): ContextType<typeof QRCodeDataContext> =>
  use(QRCodeDataContext)
