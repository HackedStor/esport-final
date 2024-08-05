import React from 'react';
import FormReservation from '../perso/FormReservation';
import TitleInscription from '../perso/TitleInscription';

const Reservation: React.FC = () => {
  return (
    <div className="cus_container">
        <TitleInscription />
        <FormReservation />
    </div>
  );
}

export default Reservation;