import React from "react";
import "./css/banner.css";

const Banner = () => {
  return (
    <div className="position-relative banner">
      <div
        className="banner-image d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "url(/../../images/banner.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="text-container text-center rounded-3">
          <h1 className="display-4 fw-bold text-content">
            A non-profit advisory group.
          </h1>
          <p className="fs-4 fw-bold text-content">
            Our mission is to assist sustainability-conscious organizations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
