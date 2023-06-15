import { useContext } from "react";

import { ItemNameContext } from "../contexts/ItemNameProvider";

const useItemName = () => useContext(ItemNameContext);

export default useItemName;
