import React from "react";

const GenreCard = ({ genre }) => {
  return (
    <div className="genre-card" style={{ backgroundColor: genre.color }}>
      <h3>{genre.title}</h3>
      <img src={genre.image} alt={`${genre.title}`} />
    </div>
  );
};

export default GenreCard;