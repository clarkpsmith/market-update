import React from "react";
import "./spinkit.css";

const ChaseLoading = () => {
  return (
    <div data-testid="loading" className="Chase-loading">
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </div>
  );
};

export default ChaseLoading;
