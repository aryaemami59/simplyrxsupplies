import { Form } from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import { memo, FC } from "react";
import { setVendors, itemInterface } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
import { AppDispatch, RootState } from "../../../data/store";

type stateToPropsReturnType = {
  checked: boolean;
  disabled: boolean;
};

const mapStateToProps = (
  state: RootState,
  ownProps: ParentProps
): stateToPropsReturnType => {
  return {
    checked: state.item[ownProps.itemObj.name].vendorsToAdd.includes(
      ownProps.vendorName
    ),
    disabled: state.item[ownProps.itemObj.name].vendorsAdded.includes(
      ownProps.vendorName
    ),
  };
};

const mapDispatchToProps = (
  dispatch: AppDispatch,
  ownProps: ParentProps
): { clickHandler: () => void } => {
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

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ParentProps {
  itemObj: itemInterface;
  vendorName: string;
}

type myProps = ParentProps & PropsFromRedux;

const SwitchComponent: FC<myProps> = ({
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

export default connector(memo<myProps>(SwitchComponent));
