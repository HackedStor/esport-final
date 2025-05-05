import React from "react";
import FormReservation from "../perso/FormReservation";
import TitleInscription from "../perso/TitleInscription";
import "../../assets/css/reservation.css";

const Reservation: React.FC = () => {
  return (
    <div className="container">
      <div className="cus_container_res">
        <TitleInscription />
        <FormReservation />
      </div>
    </div>
  );
};

export default Reservation;
