import Link from "@mui/material/Link"
import { useVendorId } from "../../hooks/useVendorId.js"
import {
  useOfficialVendorName,
  useVendorsLinks,
} from "../../redux/selectors.js"

export const VendorLink = () => {
  const vendorId = useVendorId()

  const vendorLink = useVendorsLinks(vendorId)

  const officialVendorName = useOfficialVendorName(vendorId)

  return (
    <div className="row py-3 justify-content-center">
      <Link className="w-auto" href={vendorLink} target="_blank">
        {officialVendorName} Website
      </Link>
    </div>
  )
}
