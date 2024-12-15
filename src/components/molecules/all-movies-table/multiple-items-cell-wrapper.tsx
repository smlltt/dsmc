"use clienr";

import type React from "react";
import type { FC } from "react";

interface MultipleItemsCellWrapperProps {
  children: React.ReactNode;
}

const MultipleItemsCellWrapper: FC<MultipleItemsCellWrapperProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {children}
    </div>
  );
};

export default MultipleItemsCellWrapper;
