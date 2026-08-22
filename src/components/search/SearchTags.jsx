import React from "react";

const SearchTags = ({ tags }) => {
  return (
    <section className="search-tags-section">
      <div className="tags-container">
        {tags.map((tag, index) => (
          <button key={index} className="search-tag">
            <span className="search-icon-small">🔍</span>
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SearchTags;