import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ image, title, description, link, date }) => {
  return (
    <div className="news-card">
      <img src={image} alt={title} className="news-card__image" />
      <div className="news-card__content">
        <h2 className="news-card__title">{title}</h2>
        <p className="news-card__date">{date}</p>
        <p className="news-card__description">{description}</p>
        <a href={link} className="news-card__link">Lire la suite</a>
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Card;
