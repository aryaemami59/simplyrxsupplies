import { useEffect, useRef } from "react"

/**
 * Invokes a callback when the component unmounts. This hook provides the
 * functional equivalent of React's
 * {@linkcode React.ComponentLifecycle.componentWillUnmount | componentWillUnmount}
 * lifecycle method. If {@linkcode callback} changes between renders, the most
 * recent callback is invoked when the component unmounts.
 *
 * @remarks
 * When {@linkcode React.StrictMode | React Strict Mode} is enabled, React runs
 * an additional development-only setup and cleanup cycle for Effects. As a
 * result, {@linkcode callback | callback()} may be invoked an additional time.
 *
 * @param callback - The callback to invoke when the component unmounts.
 *
 *
 * @example
 * <caption>Remove an event listener when the component unmounts.</caption>
 *
 * ```tsx
 * import { useEffect } from "react";
 * import { useComponentWillUnmount } from "../../hooks/useComponentWillUnmount.js";
 *
 * function handleResize(this: Window, event: UIEvent): void {
 *   console.log("Window resized");
 *   console.dir(event);
 * }
 *
 * export const Example = () => {
 *   useEffect(() => {
 *     window.addEventListener("resize", handleResize);
 *   }, []);
 *
 *   useComponentWillUnmount(() => {
 *     window.removeEventListener("resize", handleResize);
 *   });
 *
 *   return <div>Resize the window!</div>;
 * };
 * ```
 *
 * @example
 * <caption>Log the most recent item name when the component unmounts.</caption>
 *
 * ```tsx
 * import MenuItem from "@mui/material/MenuItem";
 * import type { MouseEventHandler } from "react";
 * import { useCallback } from "react";
 * import { useComponentWillUnmount } from "../../hooks/useComponentWillUnmount.js";
 * import { itemAddedToCarts } from "../../redux/addedSlice.js";
 * import { useAppDispatch } from "../../redux/hooks.js";
 * import { useCheckIfAddedToVendor, useItemName } from "../../redux/selectors.js";
 * import type { ItemIdAndVendorId } from "../../types/reduxHelperTypes.js";
 *
 * type Props = ItemIdAndVendorId;
 *
 * export const SingleDropDown = ({ itemId, vendorId }: Props) => {
 *   const dispatch = useAppDispatch();
 *
 *   const itemName = useItemName(itemId);
 *
 *   const ifAddedToVendor = useCheckIfAddedToVendor(vendorId, itemId);
 *
 *   const clickHandler = useCallback<MouseEventHandler<HTMLLIElement>>(() => {
 *     if (!ifAddedToVendor) {
 *       dispatch(itemAddedToCarts({ itemId }));
 *     }
 *   }, [ifAddedToVendor, dispatch, itemId]);
 *
 *   useComponentWillUnmount(() => {
 *     console.log(
 *       `Component SingleDropDown with item name %c${itemName}%c will unmount`,
 *       "font-weight: bold;",
 *       "",
 *     );
 *   });
 *
 *   return (
 *     <MenuItem
 *       className="text-wrap"
 *       disabled={ifAddedToVendor}
 *       onClick={clickHandler}
 *     >
 *       {itemName}
 *     </MenuItem>
 *   );
 * };
 * ```
 */
export const useComponentWillUnmount = (callback: () => void): void => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => callbackRef.current, [])
}
