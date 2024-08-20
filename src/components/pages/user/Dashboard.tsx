/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {slide as Menu} from 'react-burger-menu'
import '../../../assets/css/Dashboard.css';

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
      <main className="dashboard-content">
        <h1>Bonjour {pseudo || 'Utilisateur'} !</h1>
      </main>
    </div>
  );
};

export default Dashboard;
