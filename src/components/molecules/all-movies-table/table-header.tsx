import React, { FC } from "react";

interface HeaderWrapperProps {
  text: string;
}
const TableHeader: FC<HeaderWrapperProps> = ({ text }) => {
  return <h3 className={"text-center"}>{text}</h3>;
};

export default TableHeader;
