import React from "react";
import GenreCard from "./GenreCard";

const BrowseSection = ({ genres, onGenreClick }) => {
  return (
    <section className="browse-section">
      <h2 className="browse-title">Browse all</h2>

      <div className="browse-grid">
        {genres.map((genre) => (
          <GenreCard
            key={genre.id}
            genre={genre}
            onClick={onGenreClick}
          />
        ))}
      </div>
    </section>
  );
};

export default BrowseSection;