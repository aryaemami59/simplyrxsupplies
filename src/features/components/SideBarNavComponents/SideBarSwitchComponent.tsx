import { memo, FC } from "react";
import { connect } from "react-redux";
import { setVendors } from "../../../Redux/addedSlice";
import { ItemObjType, vendorNameType } from "../../../customTypes/types";
import { RootState, AppDispatch } from "../../../Redux/store";

type Props = {
  clickHandler: Function;
  checked: boolean;
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

const SideBarSwitchComponent: FC<Props> = ({
  clickHandler,
  checked,
  itemObj,
  vendorName,
}): JSX.Element => {
  return (
    <></>
    // <div className="form-check form-switch d-flex align-items-center row cursor-pointer bg-outline-primary ps-5 p-0 position-absolute top-0 start-0 bottom-0 justify-content-between">
    //   <input
    //     key={`${itemObj.name}-${vendorName}-SwitchComponent-`}
    //     onChange={clickHandler}
    //     className="form-check-input cursor-pointer"
    //     type="checkbox"
    //     role="switch"
    //     id={`${itemObj.name}-${vendorName}-SwitchComponent-`}
    //     checked={checked}
    //   />
    //   <label
    //     className="form-check-label cursor-pointer"
    //     htmlFor={`${itemObj.name}-${vendorName}-SwitchComponent-`}></label>
    // </div>
  );
};

const mapStateToProps = (state: RootState, ownProps: Props) => {
  return {
    checked: state.item[ownProps.itemObj.name]!.vendorsToAdd.includes(
      ownProps.vendorName
    ),
    disabled: state.item[ownProps.itemObj.name]!.vendorsAdded.includes(
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(SideBarSwitchComponent));
