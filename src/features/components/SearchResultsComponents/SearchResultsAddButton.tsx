import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
// import { Collapse, Badge, Fade } from "@mui/material"
// import { Badge, Collapse, Fade } from "react-bootstrap";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { shallowEqual } from "react-redux";
import { ItemObjType } from "../../../customTypes/types";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsAddButton: FC<Props> = ({ itemObj }): JSX.Element => {
  // const [show, setShow] = useState(false);
  const IfAddedToAllVendors = useAppSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useAppSelector(selectVendorsToAddTo(itemObj), shallowEqual);
  const dispatch = useAppDispatch();
  // const target = useRef<null>(null);

  // const showBadge = useCallback(() => {
  //   setShow(true);
  // }, []);
  // const hideBadge = useCallback(() => {
  //   setShow(false);
  // }, []);

  // const showThenHide = useCallback(() => {
  //   showBadge();
  //   setTimeout(hideBadge, 1500);
  // }, [showBadge, hideBadge]);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    IfAddedToAllVendors || dispatch(addItems({ itemObj, vendors }));
    // IfAddedToAllVendors
    //   ? showThenHide()
    //   : dispatch(addItems({ itemObj, vendors }));
  }, [IfAddedToAllVendors, dispatch, itemObj, vendors]);

  return (
    <>
      <Button
        disabled={IfAddedToAllVendors}
        size="large"
        variant="contained"
        key={`Button-AddItemButtonComponent-${itemObj.id}`}
        onClick={clickHandler}
        startIcon={
          <AddCircleOutlineRoundedIcon
          // icon={faPlus}
          // size="1x"
          />
        }>
        Add Item
      </Button>
      {/* <Collapse
        in={show}
        timeout={500}
        key={`Collapse-AddItemButtonComponent-${itemObj.id}`}>
        <div key={`div-AddItemButtonComponent-${itemObj.id}`}>
          <Fade
            in={show}
            timeout={500}
            key={`Fade-AddItemButtonComponent-${itemObj.id}`}>
            <Badge
              // bg="danger"
              className="d-block fw-light"
              key={`Badge-AddItemButtonComponent-${itemObj.id}`}>
              This Item Has Already Been Added!
            </Badge>
          </Fade>
        </div>
      </Collapse> */}
    </>
  );
};

export default memo<Props>(SearchResultsAddButton);
