import { Checkbox, FormControlLabel } from "@mui/material";
import { FC, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ItemObjType, VendorNameType } from "../../../customTypes/types";
import {
  selectVendorOfficialName,
  setVendors,
} from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import { AppDispatch, RootState } from "../../../Redux/store";

const mapStateToProps = (
  state: RootState,
  ownProps: ParentProps
): { checked: boolean; disabled: boolean } => ({
  checked: state.added.itemsObj[ownProps.itemObj.name]!.vendorsToAdd.includes(
    ownProps.vendorName
  ),
  disabled: state.added.itemsObj[ownProps.itemObj.name]!.vendorsAdded.includes(
    ownProps.vendorName
  ),
});

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: ParentProps) => ({
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
  vendorName: VendorNameType;
  itemObj: ItemObjType;
};

type Props = ParentProps & PropsFromRedux;

const SideBarVendorBadges: FC<Props> = ({
  vendorName,
  itemObj,
  clickHandler,
  checked,
  disabled,
}) => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  return (
    <FormControlLabel
      label={officialVendorName}
      control={
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={clickHandler}
        />
      }
    />
  );
};

export default connector(memo<Props>(SideBarVendorBadges));
