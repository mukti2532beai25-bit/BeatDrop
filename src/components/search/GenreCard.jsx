import React from "react";

// One colored genre card. onClick is called with the genre when it is clicked.
const GenreCard = ({ genre, onClick }) => {
  return (
    <div
      className="genre-card"
      style={{ backgroundColor: genre.color }}
      onClick={() => onClick(genre)}
    >
      <h3>{genre.title}</h3>
      <img src={genre.image} alt={`${genre.title}`} />
    </div>
  );
};

export default GenreCard;
