import React from "react";

export interface IDefaultLayout {}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
  return <>{children}</>;
};

export default DefaultLayout;
