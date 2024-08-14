import React, { useState } from 'react';

// Définition des types pour les props du composant Card
interface CardProps {
  image: string; // URL de l'image
  title: string; // Titre de la carte
  description: string; // Description du contenu
  link: string; // URL vers l'article complet
  date: string; // Date de publication
}

const CustomCard: React.FC<CardProps> = ({ image, title, description, link, date }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer la popup
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="news-card">
      <img src={image} alt={title} className="news-card__image" />
      <div className="news-card__content">
        <h2 className="news-card__title" onClick={toggleModal} style={{ cursor: 'pointer' }}>{title}</h2>
        <p className="news-card__date">{date}</p>
        <p className="news-card__description">{description}</p>
      </div>
      <div className="news-card__footer">
        <a href={link} className="news-card__link">Lire la suite</a>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{title}</h2>
            <p>{date}</p>
            <p>{description}</p>
            <button onClick={toggleModal}>Fermer</button>
          </div>
        </div>
      )}
    </div>

  );
};

export default CustomCard;