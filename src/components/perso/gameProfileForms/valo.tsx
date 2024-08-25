import React from "react";
import { ValoAgents } from "./input_elements/valo_characters";
import { ValoKDA } from "./input_elements/valo_kda";
import { ValoScore } from "./input_elements/valo_score";
import { AreaChartStepValo } from "../UserCharts/AreaChartStepValo";
import "../../../assets/css/reservation.css";

const ValoCard: React.FC = () => {
  return (
    <div className="valoCard">
      <AreaChartStepValo />
      <div className="ValoInputs">
        <ValoAgents />
        <ValoKDA />
        <ValoScore />
      </div>
    </div>
  );
};

export default ValoCard;
