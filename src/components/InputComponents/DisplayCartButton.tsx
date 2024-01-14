import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import type { FC, MouseEventHandler } from "react";
import { memo, useMemo } from "react";

import addedSlice from "../../redux/addedSlice";
import { useAppSelector } from "../../redux/hooks";
import { checkIfAnyItemsAdded } from "../../redux/selectors";
import type { RootState } from "../../redux/store";
import Column from "../../shared/components/Column";

type Props = {
  readonly showModal: MouseEventHandler<HTMLButtonElement>;
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

  return (
    <Column end="md">
      <IconButton
        className="d-inline-block d-md-none"
        color="inherit"
        onClick={showModal}>
        {startIcon}
      </IconButton>
    </Column>
  );
};

export default memo<Props>(DisplayCartButton);
