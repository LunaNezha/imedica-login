import { Positions } from "@src/enums/positions.enum";
import { cn } from "@src/utils/classnames";
import PropTypes from "prop-types";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  message: string;
  position: Positions;
};

const Tooltip = ({ message, position, children, ...props }: Props) => {
  return (
    <div className="group relative z-50 flex cursor-pointer" {...props}>
      <div>{children}</div>
      <span
        className={cn(
          "absolute hidden whitespace-nowrap rounded-lg bg-white-50 p-2 text-xs font-normal text-white-950 drop-shadow-lg transition group-hover:inline-block dark:bg-ebony-950 dark:text-white-200 ltr:font-montserrat rtl:font-iranyekan",
          position === Positions.Top
            ? "bottom-[calc(100%+5px)] left-1/2 -translate-x-1/2"
            : "",
          position === Positions.Bottom
            ? "left-1/2 top-[calc(100%+5px)] -translate-x-1/2"
            : "",
          position === Positions.Left
            ? "right-[calc(100%+5px)] top-1/2 -translate-y-1/2"
            : "",
          position === Positions.Right
            ? "left-[calc(100%+5px)] top-1/2 -translate-y-1/2"
            : "",
        )}
      >
        {message}
      </span>
      <span
        className={cn(
          "absolute hidden border-[6px] drop-shadow-lg transition group-hover:inline-block",
          position === Positions.Top
            ? "bottom-full left-1/2 -translate-x-1/2 border-b-0 border-l-transparent border-r-transparent border-t-white-50 dark:border-t-ebony-950"
            : "",
          position === Positions.Bottom
            ? "left-1/2 top-full -translate-x-1/2 border-t-0 border-b-white-50 border-l-transparent border-r-transparent dark:border-b-ebony-950"
            : "",
          position === Positions.Left
            ? "right-full top-1/2 -translate-y-1/2 border-r-0 border-b-transparent border-l-white-50 border-t-transparent dark:border-l-ebony-950"
            : "",
          position === Positions.Right
            ? "left-full top-1/2 -translate-y-1/2 border-l-0 border-b-transparent border-r-white-50 border-t-transparent dark:border-r-ebony-950"
            : "",
        )}
      ></span>
    </div>
  );
};

Tooltip.prototype = {
  position: PropTypes.oneOf([
    Positions.Bottom,
    Positions.Top,
    Positions.Right,
    Positions.Left,
  ]).isRequired,
  message: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
