import React, { useState } from 'react';

interface CardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  buttonSup: string;
  initialVisibility: boolean; // Visibilité initiale de l'actualité
  onActionComplete: () => void; // Appelle la fonction de rafraîchissement
}

const Card: React.FC<CardProps> = ({ id, image, title, description, date, buttonSup, initialVisibility, onActionComplete }) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://esport/src/php/Member/deleteNews.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        onActionComplete(); // Appelle la fonction de rafraîchissement
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Erreur de réseau :', error);
    }
  };

  const handleChangeVisibility = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://esport/src/php/Member/changeNewsVisibility.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, is_visible: isVisible ? 0 : 1 })
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        setIsVisible(!isVisible); // Bascule la visibilité localement
        onActionComplete(); // Appelle la fonction de rafraîchissement
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Erreur de réseau :', error);
    }
  };

  return (
    <div className="news-card">
      <img src={image} alt={title} className="news-card__image" />
      <div className="news-card__content">
        <h2 className="news-card__title">{title}</h2>
        <p className="news-card__date">{date}</p>
        <p className="news-card__description">{description}</p>
      </div>
      <div className="news-card__footer">
        <form onSubmit={handleDelete}>
          <button type='submit'>{buttonSup}</button>
        </form>
        <form onSubmit={handleChangeVisibility}>
          <button type='submit'>{isVisible ? 'Cacher l\'actus' : 'Afficher l\'actus'}</button>
        </form>
      </div>
    </div>
  );
};

export default Card;
