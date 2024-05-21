/*
 * @Author: Zhouyang Meng
 * @Date: 2024-04-23 11:19:03
 * @LastEditTime: 2024-04-23 16:57:07
 * @Description:
 *
 * Copyright (c) 2024 by YuyakeSys, All Rights Reserved.
 */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { INDUSTRY_AREAS } from "./constant";

const INDUSTRY_ICONS = {
  technology: "microchip",
  finance: "chart-line",
  healthcare: "heart-pulse",
  education: "graduation-cap",
  manufacturing: "industry",
  retail: "shopping-bag",
  energy: "bolt",
  transportation: "truck-moving",
  agriculture: "tractor",
  construction: "hard-hat",
  entertainment: "film",
  telecommunications: "phone",
  pharmaceutical: "capsules",
  real_estate: "building",
  legal: "balance-scale",
  tourism: "plane-departure",
  food_service: "utensils",
};

export const IndustryBadge = ({ industry }) => {
  const icon = INDUSTRY_ICONS[industry] || "circle-question"; // Fallback icon

  return (
    <div className="industry-badge">
      <FontAwesomeIcon icon={icon} />
      <span className="ms-1">
        {INDUSTRY_AREAS.find((area) => area.value === industry)?.label}
      </span>
    </div>
  );
};

export default IndustryBadge;
