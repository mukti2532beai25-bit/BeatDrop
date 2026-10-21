import React from "react";
import GenreCard from "./GenreCard";

<<<<<<< HEAD
const BrowseSection = ({ genres, onGenreClick }) => {
=======
const BrowseSection = ({ genres }) => {
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
  return (
    <section className="browse-section">
      <h2 className="browse-title">Browse all</h2>
      <div className="browse-grid">
        {genres.map((genre) => (
<<<<<<< HEAD
          <GenreCard key={genre.id} genre={genre} onClick={onGenreClick} />
=======
          <GenreCard key={genre.id} genre={genre} />
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
        ))}
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default BrowseSection;
=======
export default BrowseSection;
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
