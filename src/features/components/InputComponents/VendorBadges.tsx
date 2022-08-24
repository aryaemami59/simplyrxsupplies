import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { memo, FC } from "react";
import {
  checkIfAddedToOneVendor,
  selectVendorOfficialName,
} from "../../../addedSlice";
import { MouseEventHandler } from "react";
// import PropTypes from "prop-types";
import { itemInterface } from "../../../addedSlice";

interface Props {
  vendorName: string;
  itemObj: itemInterface;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

const VendorBadges: FC<Props> = ({
  vendorName,
  itemObj,
  clickHandler,
  disabled,
}): JSX.Element => {
  const ifAdded = useSelector(checkIfAddedToOneVendor(itemObj, vendorName));
  const officialVendorName = useSelector(selectVendorOfficialName(vendorName));

  return (
    <Button
      disabled={disabled}
      onClick={clickHandler}
      className="w-100 custom-text-shadow-white px-1 px-sm-2"
      variant={ifAdded ? "outline-info" : "info text-white"}
      key={`Button-VendorBadges-${vendorName}`}>
      {officialVendorName}
    </Button>
  );
};

// VendorBadges.propTypes = {
//   vendorName: PropTypes.string,
//   clickHandler: PropTypes.func,
//   itemObj: PropTypes.shape({
//     name: PropTypes.string,
//     itemNumber: PropTypes.string,
//     keywords: PropTypes.arrayOf(PropTypes.string),
//     nav: PropTypes.arrayOf(PropTypes.string),
//     vendors: PropTypes.arrayOf(PropTypes.string),
//     src: PropTypes.string,
//   }),
// };

export default memo(VendorBadges);
