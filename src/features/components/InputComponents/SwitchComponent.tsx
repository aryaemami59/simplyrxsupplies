import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { memo, FC, ChangeEventHandler, MouseEventHandler } from "react";
import { setVendors, itemInterface } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
// import PropTypes from "prop-types";
import { AppDispatch } from "../../../data/store";

interface Props {
  clickHandler:
    | MouseEventHandler<HTMLButtonElement> &
        ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  itemObj: itemInterface;
  vendorName: string;
  disabled: boolean;
}

const SwitchComponent: FC<Props> = ({
  clickHandler,
  checked,
  itemObj,
  vendorName,
  disabled,
}): JSX.Element => {
  return (
    <Form.Check
      type="switch"
      id={`${itemObj.name}-${vendorName}-SwitchComponent-SwitchComponent-${vendorName}`}
      disabled={disabled}
      className="d-flex align-items-center row bg-outline-primary w-100 pe-0"
      key={`div-SwitchComponent-${vendorName}`}>
      <Form.Check.Input
        disabled={disabled}
        onChange={clickHandler}
        checked={checked}
        className="col-1 custom-checkbox-bg cursor-pointer"
        key={`input-SwitchComponent-${vendorName}`}
      />
      <Form.Check.Label
        key={`label-SwitchComponent-${vendorName}`}
        className="col pe-0"
        htmlFor={`${itemObj.name}-${vendorName}-SwitchComponent-SwitchComponent-${vendorName}`}>
        <VendorBadges
          disabled={disabled}
          clickHandler={clickHandler}
          vendorName={vendorName}
          itemObj={itemObj}
          key={`VendorBadges-SwitchComponent-${vendorName}`}
        />
      </Form.Check.Label>
    </Form.Check>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    checked: state.item[ownProps.itemObj.name].vendorsToAdd.includes(
      ownProps.vendorName
    ),
    disabled: state.item[ownProps.itemObj.name].vendorsAdded.includes(
      ownProps.vendorName
    ),
  };
};

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: Props) => {
  return {
    clickHandler: () => {
      dispatch(
        setVendors({
          itemObj: ownProps.itemObj,
          vendorName: ownProps.vendorName,
        })
      );
    },
  };
};

// SwitchComponent.propTypes = {
//   clickHandler: PropTypes.func,
//   checked: PropTypes.bool,
//   disabled: PropTypes.bool,
//   vendorName: PropTypes.string,
//   itemObj: PropTypes.shape({
//     name: PropTypes.string,
//     itemNumber: PropTypes.string,
//     keywords: PropTypes.arrayOf(PropTypes.string),
//     nav: PropTypes.arrayOf(PropTypes.string),
//     vendors: PropTypes.arrayOf(PropTypes.string),
//     src: PropTypes.string,
//   }),
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(SwitchComponent));
