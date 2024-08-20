/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {slide as Menu} from 'react-burger-menu'
import '../../../assets/css/Dashboard.css';
import { AreaChartStepFC24 } from '../../perso/UserCharts/AreaChartStepFC24';
import { AreaChartStepLol } from '../../perso/UserCharts/AreaChartStepLol';
import { AreaChartStepMarioKart } from '../../perso/UserCharts/AreaChartStepMarioKart';
import { AreaChartStepRL } from '../../perso/UserCharts/AreaChartStepRL';
import { AreaChartStepSupSmashBros } from '../../perso/UserCharts/AreaChartStepSupSmashBros';
import { AreaChartStepTm } from '../../perso/UserCharts/AreaChartStepTm';
import { AreaChartStepValo } from '../../perso/UserCharts/AreaChartStepValo';

const Dashboard: React.FC = () => {
  const [pseudo, setPseudo] = useState<string>('');

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
          setPseudo(data.pseudo);
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
    <div className="dashboard">
      <Menu width={ 280 } >
          <a id="home" className="menu-item" href="/dashboard">Tableau de bord</a>
          <a id="about" className="menu-item" href="/dashboard/profile">Profil</a>
          <a id="about" className="menu-item" href="/logout">Déconnexion</a>
      </Menu>
      <main className="dashboard-content profile-container">
        <h1 className='title-1'>Bonjour {pseudo || 'Utilisateur'} !</h1>
        <div className='w-[full] flex gap-3 flex-wrap graphs'>
          <AreaChartStepFC24 />
          <AreaChartStepLol />
          <AreaChartStepMarioKart />
          <AreaChartStepRL />
          <AreaChartStepSupSmashBros />
          <AreaChartStepTm />
          <AreaChartStepValo />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
