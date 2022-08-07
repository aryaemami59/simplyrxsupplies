import { Input } from "reactstrap";
import {
  memo,
  useState,
  useCallback,
  useEffect,
  useTransition,
  useDeferredValue,
} from "react";
import { useDispatch } from "react-redux";
import { setListItems, selectAllListItems } from "../../../inputSlice";
import { useSelector, shallowEqual } from "react-redux";

const empty = [];

function InputFieldComponent({ items }) {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const [val, setVal] = useState("");
  // const deferredVal = useDeferredValue(val);

  const selectedListItems = useSelector(selectAllListItems);

  const changeVal = useCallback(
    e => {
      setVal(e.target.value);
      // startTransition(() => {
      const listItems = e.target.value.trim()
        ? items.filter(({ name }) =>
            name.toLowerCase().includes(e.target.value.toLowerCase().trim())
          )
        : empty;
      shallowEqual(selectedListItems, listItems) ||
        dispatch(setListItems(listItems));
      // });
    },
    [items, dispatch, selectedListItems]
  );

  useEffect(() => {
    console.log(val);
  }, [val]);

  return (
    <Input
      id="search"
      name="search"
      placeholder="Search..."
      type="search"
      className="shadow"
      bsSize="lg"
      key="input box"
      onChange={changeVal}
      value={val}
    />
  );
}

export default memo(InputFieldComponent);
