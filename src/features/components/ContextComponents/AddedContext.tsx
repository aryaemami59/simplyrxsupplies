// @ts-nocheck
import { createContext, useCallback, useState, useMemo, memo } from "react";
export const myContext = createContext();
// export const MCKContext = createContext();
function AddedContext({ children }) {
  const [itemsAdded1, setItemsAdded] = useState([]);

  const itemsAdded = useMemo(() => {
    return itemsAdded1;
  }, [itemsAdded1.length]);
  const onAdd = useCallback(ev => {
    return setItemsAdded(prev => [...prev, ev]);
  }, []);
  // const MCK = useMemo(() => {
  //   return itemsAdded.filter(({ McKesson }) => McKesson);
  // }, []);

  const value = {
    itemsAdded,
    onAdd,
  };

  return <myContext.Provider value={value}>{children}</myContext.Provider>;
}

export default memo(AddedContext);
