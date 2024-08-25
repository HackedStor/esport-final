/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { ValoAgents } from "./input_elements/valo_characters";
import { ValoKDA } from "./input_elements/valo_kda";
import { ValoScore } from "./input_elements/valo_score";
import { AreaChartStepValo } from "../UserCharts/AreaChartStepValo";
import "../../../assets/css/reservation.css";
import { ValoScoreOtherTeam } from './input_elements/valo_score_other_team';


const ValoCard: React.FC = () => {
  const [id, setId] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('email');
      try {
        const response = await fetch('http://esport/src/php/Member/getUserData.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error('Réponse non-JSON du serveur: ' + text);
        }

        if (data.success) {
          setId(data.id);
        } else {
          throw new Error(data.message || 'Erreur inconnue');
        }
      } catch (error: any) {
        console.error('Erreur détaillée:', error);
        console.error(error.message || 'Erreur lors de la récupération des données utilisateur');
      }
    };

    fetchUserData();
  }, []);



  
  return (
    <div className="valoCard">
      <AreaChartStepValo />
      <form className="ValoInputs flex flex-wrap justify-between w-[90%">
        <input type="text" value={id} hidden name='user_id'/>
        <div className='flex flex-col gap-3'>
          <ValoAgents />
          <ValoKDA />
        </div>
        <div className='flex flex-col gap-3'>
          <ValoScore />
          <ValoScoreOtherTeam />
        </div>
      </form>
    </div>
  );
};

export default ValoCard;
