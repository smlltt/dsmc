"use clienr";

import React, { FC } from "react";

interface MultipleItemsCellWrapperProps {
  children: React.ReactNode;
}

const MultipleItemsCellWrapper: FC<MultipleItemsCellWrapperProps> = ({
  children,
}) => {
  return (
    <div className="flex gap-1 flex-wrap items-center justify-center">
      {children}
    </div>
  );
};

export default MultipleItemsCellWrapper;
