import { Input } from "reactstrap";
import {
  memo,
  useState,
  useCallback,
  useEffect,
  useTransition,
  useDeferredValue,
  useMemo,
  useRef,
} from "react";
import { useDispatch } from "react-redux";
import { setListItems } from "../../../addedSlice";
const empty = [];

function InputFieldComponent({ items }) {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const [val, setVal] = useState("");
  // let test = "";
  // const test = useRef("");
  // const deferredVal = useDeferredValue(val);
  // const deferredVal = useDeferredValue(test.current);

  // const listItems = useMemo(() => {
  //   return deferredVal
  //     ? items
  //         .filter(({ name }) => name.toLowerCase().includes(deferredVal))
  //         .slice(0, 200)
  //     : empty;
  // }, [deferredVal, items]);

  const listItemsFunc = useCallback(
    e => {
      // changeVal(e);
      // dispatch(setListItems(listItems));
      // return deferredVal
      //   ? items
      //       .filter(({ name }) => name.toLowerCase().includes(deferredVal))
      //       .slice(0, 200)
      //   : empty;
      const trimmedValue = e.target.value.trim().toLowerCase();
      return trimmedValue
        ? items
            .filter(({ name }) => name.toLowerCase().includes(trimmedValue))
            .slice(0, 100)
        : empty;
    },
    [items]
  );

  // const listItems = listItemsFunc();

  const changeVal = useCallback(
    e => {
      const listItems = listItemsFunc(e);
      setVal(e.target.value);
      // test.current = e.target.value;

      // startTransition(() => {
      dispatch(setListItems(listItems));
      // });
    },
    [dispatch, listItemsFunc]
    // [listItems, dispatch]
  );

  // const changeList = useCallback(() => {
  //   dispatch(setListItems(listItems));
  // }, [dispatch, listItems]);

  // changeList();

  // useEffect(() => {
  //   dispatch(setListItems(listItems));
  // }, [dispatch, listItems]);

  // useEffect(() => {
  //   // console.log(val);
  //   // console.log("deferredVal changed", deferredVal);
  //   // console.log("val changed", val);
  // }, [deferredVal, val]);

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

  // useEffect(() => {
  //   // console.log("listItems changed", listItems);
  // }, [listItems]);

  useEffect(() => {
    // console.log("InputFieldComponent renders");
  });

  return (
    <input
      id="search"
      name="search"
      placeholder="Search..."
      type="search"
      className="shadow form-control-lg form-control"
      // bsSize="lg"
      key="input box"
      onChange={changeVal}
      value={val}
    />
    // <Input
    //   id="search"
    //   name="search"
    //   placeholder="Search..."
    //   type="search"
    //   className="shadow"
    //   bsSize="lg"
    //   key="input box"
    //   onChange={changeVal}
    //   value={val}
    // />
  );
}

export default memo(InputFieldComponent);
