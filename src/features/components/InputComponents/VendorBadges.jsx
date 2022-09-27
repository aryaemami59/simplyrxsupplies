import { Button } from "react-bootstrap";
import { memo } from "react";
import { checkIfAddedToOneVendor, selectVendorOfficialName, } from "../../../addedSlice";
import { useAppSelector } from "../../../data/store";
const VendorBadges = ({ vendorName, itemObj, clickHandler, disabled, }) => {
    const ifAdded = useAppSelector(checkIfAddedToOneVendor(itemObj, vendorName));
    const officialVendorName = useAppSelector(selectVendorOfficialName(vendorName));
    return (<Button disabled={disabled} onClick={clickHandler} className="w-100 px-1 px-sm-2" variant={ifAdded ? "outline-info" : "info text-white"} key={`Button-VendorBadges-${vendorName}`}>
      {officialVendorName}
    </Button>);
};
export default memo(VendorBadges);
