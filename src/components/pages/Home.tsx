import { useState, useEffect } from "react";
import "../../assets/css/Home.css";
import ButtonCus from "../perso/Button";
import Card from "../perso/Card";
import useDevToolsProtection from "../../Hooks/devToolsBlocker";

interface NewsItem {
  image: string;
  title: string;
  description: string;
  link: string;
  date: string;
}

function Home() {
  useDevToolsProtection();
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://esport/src/php/getNews.php");
        if (!response.ok) {
          throw new Error("Échec de la recherche de nouvelles");
        }
        const data = await response.json();

        // Vérification du message dans la réponse
        if (
          "message" in data &&
          data.message === "Pas d'annonces disponibles"
        ) {
          setError(data.message);
        } else {
          setNewsData(data);
        }
      } catch (error) {
        setError("Erreur lors de la récupération des actualités.");
        console.error("Erreur lors de la récupération des actualités:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleCTAClick = () => {
    window.location.href = "auth";
  };

  return (
    <>
      <div className="hero">
        <div className="card">
          <h1 className="title-1 font-bold">
            Découvrez l'esport au lycée Jules Ferry
          </h1>
          <p>
            Une plateforme dédiée à l'inscription et à l'information des élèves
            pour les sessions d'esport
          </p>
          <ButtonCus
            type="button"
            text="S'inscrire"
            classValue="submit"
            onClick={handleCTAClick}
          />
        </div>
      </div>
      <section className="news">
        <header className="newsHeader">
          <h2 className="title-2 font-bold">Actualités</h2>
          <p>
            Restez informé des dernières nouvelles et événements de notre
            programme d'esport. Découvrez les résultats de nos tournois récents,
            consultez les photos des moments forts et lisez les témoignages des
            participants.
          </p>
        </header>

        {loading ? (
          <p>Chargement des actualités...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="news-cards-container">
            {newsData.map((newsItem, index) => (
              <Card
                key={index}
                image={newsItem.image}
                title={newsItem.title}
                description={newsItem.description}
                link={newsItem.link}
                date={newsItem.date}
              />
            ))}
          </div>
        )}
      </section>

      <section className="schedule">
        <header className="scheduleHeader">
          <h2 className="title-3 font-bold">Calendrier des Séances</h2>
          <p>
            Consultez le calendrier pour connaître les dates et heures de nos
            séances d'esport. Assurez-vous de vous inscrire à l'avance pour
            garantir votre place et profiter de chaque session.
          </p>
        </header>
      </section>

      <section className="games">
        <header className="gamesHeader">
          <h2 className="title-4 font-bold">Jeux Disponibles</h2>
          <p>
            Nous offrons une variété de jeux pour répondre aux goûts de tous nos
            élèves. Découvrez les jeux disponibles pour nos sessions d'esport et
            commencez à vous entraîner dès aujourd'hui.
          </p>
        </header>
      </section>

      <section className="tournaments">
        <header className="tournamentsHeader">
          <h2 className="title-5 font-bold">Tournois à Venir</h2>
          <p>
            Participez à nos tournois excitants et montrez vos compétences sur
            la scène compétitive. Consultez le calendrier des tournois à venir
            et préparez-vous à entrer en jeu.
          </p>
        </header>
      </section>

      <footer className="footer">
        <p>
          © 2024 Esport au Lycée Jules Ferry. Tous droits réservés. |
          <a href="/privacy"> Politique de confidentialité</a> |
          <a href="/terms"> Conditions d'utilisation</a>
        </p>
      </footer>
    </>
  );
}

export default Home;
