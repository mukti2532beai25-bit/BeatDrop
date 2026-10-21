import React from "react";

const GenreCard = ({ genre, onClick }) => {
  function handleClick() {
    onClick?.(genre);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  }

  return (
    <div
      className="genre-card"
      style={{ backgroundColor: genre.color }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <h3>{genre.title}</h3>

      <img
        src={genre.image}
        alt={genre.title || "Music genre"}
      />
    </div>
  );
};

export default GenreCard;