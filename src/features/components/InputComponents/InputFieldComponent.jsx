import { Input } from "reactstrap";
import {
  memo,
  useState,
  useCallback,
  useEffect,
  // useTransition,
  // useDeferredValue,
} from "react";
import { useDispatch } from "react-redux";
import { setListItems } from "../../../addedSlice";

const empty = [];

function InputFieldComponent({ items }) {
  // const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const [val, setVal] = useState("");
  // const deferredVal = useDeferredValue(val);

  const listItemsFunc = useCallback(
    e => {
      const trimmedValue = e.target.value.trim().toLowerCase();
      return trimmedValue
        ? items
            .filter(({ name }) => name.toLowerCase().includes(trimmedValue))
            .slice(0, 200)
        : empty;
    },
    [items]
  );

  const changeVal = useCallback(
    e => {
      setVal(e.target.value);
      // startTransition(() => {
      const listItems = listItemsFunc(e);
      dispatch(setListItems(listItems));
      // });
    },
    [dispatch, listItemsFunc]
  );

  useEffect(() => {
    // console.log(val);
  }, [val]);

  useEffect(() => {
    // console.log("dispatch changed");
  }, [dispatch]);

  useEffect(() => {
    // console.log("setVal changed");
  }, [setVal]);

  useEffect(() => {
    // console.log("changeVal changed");
  }, [changeVal]);

  useEffect(() => {
    // console.log("listItemsFunc changed");
  }, [listItemsFunc]);

  useEffect(() => {
    // console.log("InputFieldComponent Mounts");
    // return () => console.log("InputFieldComponent Unmounts");
  }, []);

  useEffect(() => {
    // console.log(" changed");
  }, []);

  useEffect(() => {
    // console.log("InputFieldComponent renders");
  });

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
