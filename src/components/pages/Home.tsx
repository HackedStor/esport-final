import { useState, useEffect } from 'react';
import '../../assets/css/Home.css';
import ButtonCus from '../perso/Button';
import Card from '../perso/Card';
import { Button } from "../ui//button"

interface NewsItem {
    image: string;
    title: string;
    description: string;
    link: string;
    date: string;
}

export function ButtonDemo() {
  return <Button>Button</Button>
}

function Home() {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('http://esport/src/php/getNews.php');
                const data: NewsItem[] = await response.json();
                setNewsData(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des actualités:', error);
            }
        };

        fetchNews();
    }, []);

    const handleCTAClick = () => {
        console.log('Bonjour');
    }

    return (
        <>
            <div className="hero" style={{ backgroundImage: 'url(http://esport/src/img/fond-armateam.png)', backgroundPosition: 'center', backgroundSize: 'cover', width: '100vw', height: '100vh' }}>
                <div className="card flex flex-col gap-6 w-1/3">
                    <h1 className="text-3xl font-bold w-full d font-custom">Découvrez l'esport au lycée Jules Ferry Versailles</h1>
                    <p>Une plateforme dédiée à l'inscription et à l'information des élèves pour les sessions d'esport</p>
                    <ButtonCus
                        type="button"
                        text="S'inscrire"
                        classValue="submit"
                        onClick={handleCTAClick}
                    />
                </div>
            </div>
            <section className="news w-screen flex justify-center">
                <header className="newsHeader">
                    <h2 className='text-5xl font-extrabold mb-4'>Actualités</h2>
                    <p className='mb-4'>Restez informé des dernières nouvelles et événements de notre programme d'esport. Découvrez les résultats de nos tournois récents, consultez les photos des moments forts et lisez les témoignages des participants.</p>
                </header>

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
            </section>

            <section className="schedule w-screen flex justify-center">
                <header className="scheduleHeader">
                    <h2 className='text-5xl font-extrabold mb-4'>Calendrier des Séances</h2>
                    <p>Consultez le calendrier pour connaître les dates et heures de nos séances d'esport. Assurez-vous de vous inscrire à l'avance pour garantir votre place et profiter de chaque session.</p>
                </header>
            </section>

            <section className="games w-screen flex justify-center">
                <header className="gamesHeader">
                    <h2 className='text-5xl font-extrabold mb-4'>Jeux Disponibles</h2>
                    <p>Nous offrons une variété de jeux pour répondre aux goûts de tous nos élèves. Découvrez les jeux disponibles pour nos sessions d'esport et choisissez ceux que vous souhaitez pratiquer et maîtriser.</p>
                </header>
            </section>

            <section className="tournaments w-screen flex justify-center">
                <header className="tournamentsHeader">
                    <h2 className='text-5xl font-extrabold mb-4'>Futurs Tournois</h2>
                    <p>Préparez-vous pour nos prochains tournois ! Consultez les détails des événements à venir, y compris les dates, les jeux et les modalités d'inscription. Ne manquez pas l'opportunité de participer et de représenter notre lycée.</p>
                </header>
            </section>
            <footer className="footer py-8 bg-[#292929] w-screen text-grey text-xl font-">
                <p>Contactez-nous | Suivez-nous sur les réseaux sociaux | <a className='underline' href="http://esport/src/components/pages/administration/mentions.html">Mentions légales</a> | <a href="http://esport/src/php/compnents/pages/administration/pc.html" className='underline'>Politique de confidentialité</a></p>
            </footer>
        </>
    );
}

export default Home;


