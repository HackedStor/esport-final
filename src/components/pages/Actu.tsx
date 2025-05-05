import Card from '../perso/Card';
import { useState, useEffect } from 'react';
import '../../assets/css/Actu.css';

interface NewsItem {
    title: string;
    description: string;
    date: string;
    image: string;
    link: string;
}

function Actu() {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
          try {
            const response = await fetch("/php/getNews.php");
            if (!response.ok) {
              throw new Error("Échec de la recherche de nouvelles");
            }
            const data = await response.json();
    
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

    return (
        <div className="actu-container">
            <div className="actu-content">
                <h1>Actualités</h1>
                {loading && <p>Chargement des actualités...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && newsData.length === 0 && (
                    <p>Aucune actualité disponible.</p>
                )}
                {!loading && !error && newsData.length > 0 && (
                    <div className="news-grid">
                        {newsData.map((news, index) => (
                            <Card key={index} title={news.title} description={news.description} date={news.date} image={news.image} link={news.link} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Actu;