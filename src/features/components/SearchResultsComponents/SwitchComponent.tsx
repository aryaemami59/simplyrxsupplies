import { Button, FormControlLabel, Switch } from "@mui/material";
import { FC, memo } from "react";
import { Form } from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import { ItemObjType, vendorNameType } from "../../../customTypes/types";
import {
  setVendors,
  selectVendorOfficialName,
} from "../../../Redux/addedSlice";
import { AppDispatch, RootState } from "../../../Redux/store";
import VendorBadges from "./VendorBadges";
import { useAppSelector } from "../../../Redux/hooks";

type stateToPropsReturnType = {
  checked: boolean;
  disabled: boolean;
};

const mapStateToProps = (
  state: RootState,
  ownProps: ParentProps
): stateToPropsReturnType => {
  return {
    checked: state.item[ownProps.itemObj.name]!.vendorsToAdd.includes(
      ownProps.vendorName
    ),
    disabled: state.item[ownProps.itemObj.name]!.vendorsAdded.includes(
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

type ParentProps = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

type myProps = ParentProps & PropsFromRedux;

const SwitchComponent: FC<myProps> = ({
  clickHandler,
  checked,
  itemObj,
  vendorName,
  disabled,
}): JSX.Element => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  return (
    <>
      <FormControlLabel
        // className=""
        control={
          <Switch
            checked={checked}
            disabled={disabled}
            onChange={clickHandler}
          />
        }
        // label={
        //   <Button
        //     className="flex-grow-1 d-block"
        //     fullWidth
        //     onClick={clickHandler}
        //     variant="contained">
        //     {officialVendorName}
        //   </Button>
        // }

        label={officialVendorName}
      />
      {/* <Form.Check
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
      </Form.Check> */}
    </>
  );
};

export default connector(memo<myProps>(SwitchComponent));
