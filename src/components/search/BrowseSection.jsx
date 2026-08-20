import React from "react";
import GenreCard from "./GenreCard";

const BrowseSection = ({ genres }) => {
  return (
    <section className="browse-section">
      <h2 className="browse-title">Browse all</h2>
      <div className="browse-grid">
        {genres.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
    </section>
  );
};

export default BrowseSection;