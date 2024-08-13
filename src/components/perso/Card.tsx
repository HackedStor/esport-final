import React from 'react';

// Définition des types pour les props du composant Card
interface CardProps {
  image: string; // URL de l'image
  title: string; // Titre de la carte
  description: string; // Description du contenu
  link: string; // URL vers l'article complet
  date: string; // Date de publication
}

const CustomCard: React.FC<CardProps> = ({ image, title, description, link, date }) => {
  return (
    <div className="news-card">
      <img src={image} alt={title} className="news-card__image" />
      <div className="news-card__content">
        <h2 className="news-card__title">{title}</h2>
        <p className="news-card__date">{date}</p>
        <p className="news-card__description">{description}</p>
      </div>
      <div className="news-card__footer">
        <a href={link} className="news-card__link">Lire la suite</a>
      </div>
    </div>

  );
};

export default CustomCard;