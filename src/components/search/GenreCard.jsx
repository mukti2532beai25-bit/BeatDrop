import React from "react";

<<<<<<< HEAD
// One colored genre card. onClick is called with the genre when it is clicked.
const GenreCard = ({ genre, onClick }) => {
  return (
    <div
      className="genre-card"
      style={{ backgroundColor: genre.color }}
      onClick={() => onClick(genre)}
    >
=======
const GenreCard = ({ genre }) => {
  return (
    <div className="genre-card" style={{ backgroundColor: genre.color }}>
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
      <h3>{genre.title}</h3>
      <img src={genre.image} alt={`${genre.title}`} />
    </div>
  );
};

<<<<<<< HEAD
export default GenreCard;
=======
export default GenreCard;
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
