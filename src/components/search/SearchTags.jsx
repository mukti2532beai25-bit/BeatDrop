import React from "react";


const SearchTags = ({ tags, onTagClick }) => {
  // nothing to show yet
  if (tags.length === 0) {
    return null;
  }

  return (
    <section className="search-tags-section">
      <div className="tags-container">
        {tags.map((tag, index) => (
          <button
            key={index}
            type="button"
            className="search-tag"
            onClick={() => onTagClick(tag)}
          >
            <span className="search-icon-small">🔍</span>
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SearchTags;
