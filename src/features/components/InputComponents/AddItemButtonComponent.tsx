import { Fade, Collapse, Badge, Button } from "react-bootstrap";
import {
  memo,
  useCallback,
  useRef,
  useState,
  FC,
  MouseEventHandler,
} from "react";
import { shallowEqual } from "react-redux";
import { ItemObjType } from "../../../customTypes/types";
import { useAppSelector, useAppDispatch } from "../../../Redux/hooks";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../Redux/addedSlice";

type Props = {
  itemObj: ItemObjType;
};

const AddItemButtonComponent: FC<Props> = ({ itemObj }): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const IfAddedToAllVendors = useAppSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useAppSelector(selectVendorsToAddTo(itemObj), shallowEqual);
  const dispatch = useAppDispatch();
  const target = useRef<null>(null);

  const showBadge = useCallback(() => {
    setShow(true);
  }, []);
  const hideBadge = useCallback(() => {
    setShow(false);
  }, []);

  const showThenHide = useCallback(() => {
    showBadge();
    setTimeout(hideBadge, 1500);
  }, [showBadge, hideBadge]);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    IfAddedToAllVendors
      ? showThenHide()
      : dispatch(addItems({ itemObj, vendors }));
  }, [IfAddedToAllVendors, showThenHide, dispatch, itemObj, vendors]);

  return (
    <Button
      ref={target}
      size="lg"
      key={`Button-AddItemButtonComponent-${itemObj.name}`}
      onClick={clickHandler}
      className="btn btn-success d-block w-100 position-relative mb-2 fw-bold rounded-pill shadow custom-text-shadow-white">
      Add Item
      <Collapse
        in={show}
        timeout={500}
        key={`Collapse-AddItemButtonComponent-${itemObj.name}`}>
        <div key={`div-AddItemButtonComponent-${itemObj.name}`}>
          <Fade
            in={show}
            timeout={500}
            key={`Fade-AddItemButtonComponent-${itemObj.name}`}>
            <Badge
              bg="danger"
              className="d-block fw-light"
              key={`Badge-AddItemButtonComponent-${itemObj.name}`}>
              This Item Has Already Been Added!
            </Badge>
          </Fade>
        </div>
      </Collapse>
    </Button>
  );
};

export default memo<Props>(AddItemButtonComponent);
