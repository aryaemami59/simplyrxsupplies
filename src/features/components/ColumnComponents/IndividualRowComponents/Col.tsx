import { FC, memo } from "react";

interface ColumnProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

const Col: FC<ColumnProps> = (props: ColumnProps) => {
  const { xs, sm, md, lg, xl, xxl, children } = props;
  return (
    <>
      <div
        className={`col-${xs} col-sm-${sm} col-md-${md} col-lg-${lg} col-xl-${xl} col-xl-${xl} col-xxl-${xxl}`}
        {...props}>
        {children}
      </div>
    </>
  );
};

export default memo<ColumnProps>(Col);
