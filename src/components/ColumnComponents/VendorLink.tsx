import Link from "@mui/material/Link"
import type { FC } from "react"
import { memo } from "react"
import { useVendorId } from "../../hooks/useVendorId"
import { useOfficialVendorName, useVendorsLinks } from "../../redux/selectors"

const VendorLink: FC = () => {
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

export default memo(VendorLink)
