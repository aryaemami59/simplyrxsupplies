import { createContext, useCallback, useState } from "react";

export const myContext = createContext();

function AddedContext({ children }) {
  const [itemsAdded, setItemsAdded] = useState([]);
  const onAdd = useCallback(ev => {
    return setItemsAdded(prev => [...prev, ev]);
  }, []);

  const value = {
    itemsAdded,
    onAdd,
  };

  return <myContext.Provider value={value}>{children}</myContext.Provider>;
}

export default AddedContext;
