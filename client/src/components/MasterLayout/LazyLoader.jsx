import React from "react";
import loding from "../../assets/images/loding.svg";
const LazyLoader = () => {
  return (
    <div className="LoadingOverlay">
      <img src={loding} alt="Loding" className="overLayImg" />
    </div>
  );
};

export default LazyLoader;
