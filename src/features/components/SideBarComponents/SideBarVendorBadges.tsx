import { Checkbox, FormControlLabel } from "@mui/material";
import { FC, memo, useContext } from "react";
import { Form } from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import { DarkMode } from "../../../App";
import { ItemObjType, vendorNameType } from "../../../customTypes/types";
import {
  selectVendorOfficialName,
  setVendors,
} from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import { AppDispatch, RootState } from "../../../Redux/store";

const mapStateToProps = (
  state: RootState,
  ownProps: ParentProps
): { checked: boolean; disabled: boolean } => {
  return {
    checked: state.item[ownProps.itemObj.name]!.vendorsToAdd.includes(
      ownProps.vendorName
    ),
    disabled: state.item[ownProps.itemObj.name]!.vendorsAdded.includes(
      ownProps.vendorName
    ),
  };
};

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: ParentProps) => {
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
  vendorName: vendorNameType;
  itemObj: ItemObjType;
};

type Props = ParentProps & PropsFromRedux;

const SideBarVendorBadges: FC<Props> = ({
  vendorName,
  itemObj,
  clickHandler,
  checked,
  disabled,
}): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  return (
    <>
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

      {/* <Form.Check
        type="checkbox"
        className={darkTheme ? "text-info custom-text-shadow-whit" : "text-dark"}
        id={`Form.Check-SideBarVendorBadges-${itemObj.id}-${vendorName}`}
        key={`${itemObj.id}-Badge-SideBarVendorBadges-`}>
        <Form.Check.Input
          disabled={disabled}
          onChange={clickHandler}
          checked={checked}
          className={`cursor-pointer ${darkTheme ? "custom-checkbox-bg" : ""}`}
          type="checkbox"
          key={`Form.Check.Input-SideBarVendorBadges-${itemObj.id}`}
        />
        <Form.Check.Label
          className="cursor-pointer"
          htmlFor={`Form.Check-SideBarVendorBadges-${itemObj.id}-${vendorName}`}>
          {officialVendorName}
        </Form.Check.Label>
      </Form.Check> */}
    </>
  );
};

export default connector(memo<Props>(SideBarVendorBadges));
