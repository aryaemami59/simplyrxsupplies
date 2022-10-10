import { Checkbox, FormControlLabel } from "@mui/material";
import { FC, memo, useCallback } from "react";
import {
  VendorAndItemName
} from "../../../customTypes/types";
import {
  checkIfItemAddedToOneVendor,
  checkVendorsToAdd,
  selectVendorOfficialName,
  setVendors
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

// const mapStateToProps = (
//   state: RootState,
//   ownProps: ParentProps
// ): { checked: boolean; disabled: boolean } => ({
//   checked: state.added.itemsObj[ownProps.itemName]!.vendorsToAdd.includes(
//     ownProps.vendorName
//   ),
//   disabled: state.added.itemsObj[ownProps.itemName]!.vendorsAdded.includes(
//     ownProps.vendorName
//   ),
// });

// const mapDispatchToProps = (dispatch: AppDispatch, ownProps: ParentProps) => ({
//   clickHandler: () => {
//     dispatch(
//       setVendors({
//         itemName: ownProps.itemName,
//         vendorName: ownProps.vendorName,
//       })
//     );
//   },
// });

// const connector = connect(mapStateToProps, mapDispatchToProps);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// type ParentProps = {
//   vendorName: VendorNameType;
//   itemObj: ItemObjType;
// };

// type Props = ParentProps & PropsFromRedux;

type Props = VendorAndItemName;

const SideBarVendorBadges: FC<Props> = ({
  vendorName,
  itemName,
  // itemObj,
  // clickHandler,
  // checked,
  // disabled,
}) => {
  const dispatch = useAppDispatch();
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const checked = useAppSelector(checkVendorsToAdd(vendorName, itemName));

  const disabled = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemName)
  );

  const clickHandler = useCallback(() => {
    dispatch(setVendors({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

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

export default memo<Props>(SideBarVendorBadges);
// export default connector(memo<Props>(SideBarVendorBadges));
