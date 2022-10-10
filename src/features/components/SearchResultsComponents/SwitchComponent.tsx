import { FormControlLabel, Switch } from "@mui/material";
import { FC, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ItemObjType, VendorNameType } from "../../../customTypes/types";
import {
  selectVendorOfficialName,
  setVendors,
} from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import { AppDispatch, RootState } from "../../../Redux/store";

type stateToPropsReturnType = {
  checked: boolean;
  disabled: boolean;
};

const mapStateToProps = (
  state: RootState,
  ownProps: ParentProps
): stateToPropsReturnType => ({
  checked: state.added.itemsObj[ownProps.itemObj.name]!.vendorsToAdd.includes(
    ownProps.vendorName
  ),
  disabled: state.added.itemsObj[ownProps.itemObj.name]!.vendorsAdded.includes(
    ownProps.vendorName
  ),
});

const mapDispatchToProps = (
  dispatch: AppDispatch,
  ownProps: ParentProps
): { clickHandler: () => void } => ({
  clickHandler: () => {
    dispatch(
      setVendors({
        itemObj: ownProps.itemObj,
        vendorName: ownProps.vendorName,
      })
    );
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ParentProps = {
  itemObj: ItemObjType;
  vendorName: VendorNameType;
};

type myProps = ParentProps & PropsFromRedux;

const SwitchComponent: FC<myProps> = ({
  clickHandler,
  checked,
  itemObj,
  vendorName,
  disabled,
}) => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          disabled={disabled}
          onChange={clickHandler}
        />
      }
      label={officialVendorName}
    />
  );
};

export default connector(memo<myProps>(SwitchComponent));
