import React from "react";

<<<<<<< HEAD

const SearchTags = ({ tags, onTagClick }) => {
  // nothing to show yet
  if (tags.length === 0) {
    return null;
  }

=======
const SearchTags = ({ tags }) => {
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
  return (
    <section className="search-tags-section">
      <div className="tags-container">
        {tags.map((tag, index) => (
<<<<<<< HEAD
          <button
            key={index}
            type="button"
            className="search-tag"
            onClick={() => onTagClick(tag)}
          >
=======
          <button key={index} className="search-tag">
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
            <span className="search-icon-small">🔍</span>
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default SearchTags;
=======
export default SearchTags;
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
