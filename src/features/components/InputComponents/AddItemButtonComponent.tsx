import { Fade, Collapse, Badge, Button } from "react-bootstrap";
import {
  memo,
  useCallback,
  useRef,
  useState,
  FC,
  SetStateAction,
  Dispatch,
  RefObject,
  MouseEventHandler,
} from "react";
import { shallowEqual } from "react-redux";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../addedSlice";
import { useAppSelector, useAppDispatch } from "../../../data/store";
import { itemInterface } from "../../../addedSlice";

interface Props {
  itemObj: itemInterface;
}

const AddItemButtonComponent: FC<Props> = ({ itemObj }): JSX.Element => {
  const [show, setShow]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const IfAddedToAllVendors: boolean = useAppSelector<boolean>(
    checkIfAddedToAllVendors(itemObj)
  );
  const vendors: string[] = useAppSelector<string[]>(
    selectVendorsToAddTo(itemObj),
    shallowEqual
  );
  const dispatch = useAppDispatch();
  const target: RefObject<HTMLButtonElement> = useRef<null>(null);

  const showBadge = useCallback((): void => {
    setShow(true);
  }, []);
  const hideBadge = useCallback((): void => {
    setShow(false);
  }, []);

  const showThenHide = useCallback((): void => {
    showBadge();
    setTimeout(hideBadge, 1500);
  }, [showBadge, hideBadge]);

  const clickHandler: MouseEventHandler<HTMLButtonElement> =
    useCallback((): void => {
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
