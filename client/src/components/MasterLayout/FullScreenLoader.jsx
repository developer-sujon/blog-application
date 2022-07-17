import React from "react";

import { useSelector } from "react-redux";

import loding from "../../assets/images/loding.svg";
const FullScreenLoader = () => {
  const loder = useSelector((state) => state.setting.isLoading);

  return (
    <div className={loder ? "LoadingOverlay" : "LoadingOverlay  d-none"}>
      <img src={loding} alt="Loding" className="overLayImg" />
    </div>
  );
};

export default FullScreenLoader;
