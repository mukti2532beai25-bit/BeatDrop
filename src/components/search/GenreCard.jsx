import React from "react";

const GenreCard = ({ genre, onClick }) => (
  <button
    type="button"
    className="genre-card"
    style={{ backgroundColor: genre.color }}
    onClick={onClick}
  >
    <h3>{genre.title}</h3>
    <img src={genre.image} alt="" />
  </button>
);

export default GenreCard;
