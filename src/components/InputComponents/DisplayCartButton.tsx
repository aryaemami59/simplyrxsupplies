import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import type { FC, MouseEventHandler } from "react";
import { memo, useMemo } from "react";

import { useAppSelector } from "../../redux/hooks";
import { checkIfAnyItemsAdded } from "../../redux/selectors";

// const startIcon = (
//   <FontAwesomeIcon
//     icon={faShoppingCart}
//   />
// );

type Props = {
  showModal: MouseEventHandler<HTMLButtonElement>;
};

const DisplayCartButton: FC<Props> = ({ showModal }) => {
  const ifAdded = useAppSelector(checkIfAnyItemsAdded);
  const startIcon = useMemo(
    () => (
      <Badge
        color="error"
        invisible={!ifAdded}
        overlap="circular"
        variant="dot">
        {ifAdded ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />}
      </Badge>
    ),
    [ifAdded]
  );
  // const startIcon = useMemo(
  //   () => (
  //     <FontAwesomeIcon
  //       icon={faShoppingCart}
  //       inverse={!ifAdded}
  //     />
  //   ),
  //   [ifAdded]
  // );

  return (
    <IconButton
      // color="default"
      // size="large"
      className="d-inline-block d-md-none"
      color="inherit"
      onClick={showModal}>
      {/* <ShoppingCartOutlinedIcon /> */}
      {startIcon}
    </IconButton>
  );
};

export default memo<Props>(DisplayCartButton);
