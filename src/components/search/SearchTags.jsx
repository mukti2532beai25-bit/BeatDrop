import React from "react";

const SearchTags = ({ tags, onTagClick }) => {
  // Don't show the section if there are no recent searches.
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <section className="search-tags-section">
      <div className="tags-container">
        {tags.map((tag, index) => (
          <button
            key={`${tag}-${index}`}
            type="button"
            className="search-tag"
            onClick={() => onTagClick?.(tag)}
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