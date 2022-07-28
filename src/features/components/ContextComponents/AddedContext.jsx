import { createContext, useCallback, useState, useMemo } from "react";

export const myContext = createContext();
export const MCKContext = createContext();

function AddedContext({ children }) {
  const [itemsAdded, setItemsAdded] = useState([]);
  const onAdd = useCallback(ev => {
    return setItemsAdded(prev => [...prev, ev]);
  }, []);
  const MCK = useMemo(() => {
    return itemsAdded.filter(({ McKesson }) => McKesson);
  }, []);

  const value = {
    itemsAdded,
    onAdd,
  };

  return <myContext.Provider value={value}>{children}</myContext.Provider>;
}

export default AddedContext;
