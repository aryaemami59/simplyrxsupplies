import { memo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { ToggleItemNumber } from "../../../addedSlice";
import { useAppDispatch, useAppSelector } from "../../../data/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
const ColumnToggleItemNumberButton = () => {
    const dispatch = useAppDispatch();
    const itemNumberShown = useAppSelector((state) => state.added.showItemNumber);
    const toggleItemNumber = useCallback(() => {
        dispatch(ToggleItemNumber());
    }, [dispatch]);
    return (<Button onClick={toggleItemNumber}>
      {itemNumberShown ? "Hide" : "Show"} Item Number
      <FontAwesomeIcon size="lg" className="ms-3" icon={itemNumberShown ? faToggleOn : faToggleOff}/>
    </Button>);
};
export default memo(ColumnToggleItemNumberButton);
