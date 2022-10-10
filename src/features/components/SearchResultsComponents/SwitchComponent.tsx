import { FormControlLabel, Switch } from "@mui/material";
import { FC, memo, useCallback } from "react";
import { ItemName, VendorNameType } from "../../../customTypes/types";
import {
  checkVendorsAdded,
  checkVendorsToAdd,
  selectVendorOfficialName,
  setVendors,
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

// type stateToPropsReturnType = {
//   checked: boolean;
//   disabled: boolean;
// };

// const mapStateToProps = (
//   state: RootState,
//   ownProps: ParentProps
// ): stateToPropsReturnType => ({
//   checked: state.added.itemsObj[ownProps.itemName]!.vendorsToAdd.includes(
//     ownProps.vendorName
//   ),
//   disabled: state.added.itemsObj[ownProps.itemName]!.vendorsAdded.includes(
//     ownProps.vendorName
//   ),
// });

// const mapDispatchToProps = (
//   dispatch: AppDispatch,
//   ownProps: ParentProps
// ): { clickHandler: () => void } => ({
//   clickHandler: () => {
//     dispatch(
//       setVendors({
//         itemObj: ownProps.itemObj,
//         vendorName: ownProps.vendorName,
//       })
//     );
//   },
// });

// const connector = connect(mapStateToProps, mapDispatchToProps);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// type ParentProps = {
//   itemName: ItemName;
//   vendorName: VendorNameType;
// };

// type myProps = ParentProps & PropsFromRedux;

type Props = {
  itemName: ItemName;
  vendorName: VendorNameType;
};

const SwitchComponent: FC<Props> = ({ itemName, vendorName }) => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const dispatch = useAppDispatch();

  const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const disabled = useAppSelector(checkVendorsAdded(vendorName, itemName));

  const clickHandler = useCallback(() => {
    dispatch(setVendors({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

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

export default memo<Props>(SwitchComponent);
