import React from "react";

export interface ILoadingScreen {}

const LoadingScreen: React.FC<ILoadingScreen> = () => {
    return (<div className={"p-1"}>Loading...</div>)
}

export default LoadingScreen