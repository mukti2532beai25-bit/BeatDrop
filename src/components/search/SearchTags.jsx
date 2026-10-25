import React from "react";

const SearchTags = ({ tags, onTagClick }) => {
  if (!tags.length) {
    return null;
  }

  return (
    <section className="search-tags-section">
      <div className="search-section-heading">
        <h2>Recent searches</h2>
      </div>
      <div className="tags-container">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="search-tag"
            onClick={() => onTagClick(tag)}
          >
            <span className="search-icon-small">⌕</span>
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SearchTags;
