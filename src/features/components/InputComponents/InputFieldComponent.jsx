import { Input } from "reactstrap";
import {
  memo,
  useState,
  useCallback,
  useEffect,
  useMemo,
  // useTransition,
  // useDeferredValue,
} from "react";
import { useDispatch } from "react-redux";
import {
  setListItems,
  selectAllListItems,
  checkIfSameArray,
} from "../../../inputSlice";
import { useSelector, shallowEqual } from "react-redux";

const empty = [];

function InputFieldComponent({ items }) {
  // const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const [val, setVal] = useState("");
  // const ifEmptyList = useSelector(checkIfSameArray(empty, val));
  // console.log(ifEmptyList);
  // const deferredVal = useDeferredValue(val);

  // const selectedListItems = useSelector(selectAllListItems);

  const listItemsFunc = useCallback(
    e => {
      const trimmedValue = e.target.value.trim().toLowerCase();
      return trimmedValue
        ? items.filter(({ name }) => name.toLowerCase().includes(trimmedValue))
        : empty;
    },
    [items]
  );

  const changeVal = useCallback(
    e => {
      setVal(e.target.value);
      // startTransition(() => {
      const listItems = listItemsFunc(e);
      // const listItems = useMemo(() => {
      //   return listItemsFunc(e)
      // }, [e]);
      // const listItems = e.target.value.trim()
      //   ? items.filter(({ name }) =>
      //       name.toLowerCase().includes(e.target.value.toLowerCase().trim())
      //     )
      //   : empty;
      // shallowEqual(empty, listItems) ||
      // shallowEqual(selectedListItems, listItems) ||
      // ifEmptyList ||
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

  // useEffect(() => {
  //   // console.log("selectedListItems changed");
  // }, [selectedListItems]);

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
