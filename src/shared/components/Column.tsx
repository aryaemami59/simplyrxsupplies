import type { Breakpoint } from "@mui/material";
import type { FC } from "react";
import { memo } from "react";

import type { PropsWithRequiredChildren } from "../../types/tsHelpers";
import { useTypedMediaQuery } from "../themes";

type Props = PropsWithRequiredChildren & {
  start?: Breakpoint;
  end?: Breakpoint;
};

const Column: FC<Props> = ({ children, end, start = "xs" }) => {
  const matches = useTypedMediaQuery(theme =>
    end ? theme.breakpoints.between(start, end) : theme.breakpoints.up(start)
  );
  return matches && children;
};

Column.defaultProps = {
  end: undefined,
  start: "xs",
};

export default memo<Props>(Column);
