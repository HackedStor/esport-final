// src/components/Reservation.js
import React from 'react';
import FormReservation from '../FormReservation';
import TitleInscription from '../TitleInscription';

function Reservation() {
  return (
    <div className="cus_container">
        <TitleInscription></TitleInscription>
        <FormReservation></FormReservation>
    </div>
  );
}

export default Reservation;