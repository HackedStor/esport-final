import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/Dashboard.css';
import Card from '../../perso/Card_admin';

interface NewsItem {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
  date: string;
  is_visible: number;
}

const AdminDashboard: React.FC = () => {
  const [pseudo, setPseudo] = useState<string>('');
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les actualités
  const refreshNews = useCallback(async () => {
    try {
      const response = await fetch("http://esport/src/php/getNewsFromAdmin.php");
      if (!response.ok) {
        throw new Error("Échec de la recherche de nouvelles");
      }
      const data = await response.json();

      // Vérification du message dans la réponse
      if ('message' in data && data.message === "Pas d'annonces disponibles") {
        setError(data.message);
        setNewsData([]);
      } else {
        setNewsData(data);
      }
    } catch (error) {
      setError("Erreur lors de la récupération des actualités.");
      console.error("Erreur lors de la récupération des actualités:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshNews(); // Appel initial pour charger les actualités
  }, [refreshNews]);

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
      } catch (error) {
        console.error('Erreur détaillée:', error);
        console.error((error as Error).message || 'Erreur lors de la récupération des données utilisateur');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <nav>
          <ul className='mt-6'>
            <li><Link to="/dashboard">Tableau de bord</Link></li>
            <li><Link to="/admin/dashboard/actualites">Actualitées</Link></li>
            <li><Link to="/dashboard/settings">Paramètres</Link></li>
            <li><Link to="/logout">Déconnexion</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-content">
        <h1 className='mt-5 text-5xl font-extrabold'>Bonjour Admin {pseudo || 'Utilisateur'} !</h1>
        <section className="news">
          <header className="newsHeader">
            <h2 className="title-6 font-regular">Les actualités dans la base de données</h2>
          </header>

          {loading ? (
            <p>Chargement des actualités...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="news-cards-container">
              {newsData.map((newsItem, index) => (
                <Card
                  id={newsItem.id}
                  key={index}
                  image={newsItem.image}
                  title={newsItem.title}
                  description={newsItem.description}
                  date={newsItem.date}
                  buttonSup="Supprimer"
                  onActionComplete={refreshNews}
                  initialVisibility={newsItem.is_visible === 1} // Passe la visibilité actuelle
                  
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
