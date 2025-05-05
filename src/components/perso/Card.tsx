import React, { useState } from "react";
import "../../assets/css/Actu.css";

// Définition des types pour les props du composant Card
interface CardProps {
  image: string;
  title: string;
  description: string; 
  link: string;
  date: string;
}

const CustomCard: React.FC<CardProps> = ({
  image,
  title,
  description,
  link,
  date,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer la popup
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const formatDescription = (text: string) => {
    return text.replace(/\n/g, "<br />");
  }

  return (
    <div className="news-card">
      <img src={image} alt={title} className="news-card__image" />
      <div className="news-card__content">
        <h2
          className="news-card__title"
          onClick={toggleModal}
          style={{ cursor: "pointer" }}
        >
          {title}
        </h2>
        <p className="news-card__date">{date}</p>
        <p className="news-card__description" dangerouslySetInnerHTML={{ __html: formatDescription(description)}}></p>
      </div>
      <div className="news-card__footer">
        <a onClick={toggleModal} className="news-card__link">
          Lire la suite
        </a>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modalH2">{title}</h2>
            <p className="modalP">{date}</p>
            <p className="modalText"  dangerouslySetInnerHTML={{ __html: formatDescription(description)}}></p>
            <a href={link} className="modalLink">
              Lien externe: {link}
            </a>
            <button className="modalClose" onClick={toggleModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCard;
