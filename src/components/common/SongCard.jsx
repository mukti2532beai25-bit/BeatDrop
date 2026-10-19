import { useState } from "react";
import { Play, Heart, Plus, Music } from "lucide-react";
import "./SongCard.css";

function SongCard({ song, onPlay, isLiked, onLike, onAdd }) {
  const [showImage, setShowImage] = useState(true);

  const title = song.name || song.title || "Unknown Song";
  const artist = song.artists || song.artist || "Unknown Artist";
  const image = song.image || song.cover;

  return (
    <div className="song-card">
      {image && showImage ? (
        <img
          src={image}
          alt={title}
          className="song-image"
          onError={() => setShowImage(false)}
        />
      ) : (
        <div className="no-image">
          <Music size={40} />
        </div>
      )}

      <h3 title={title}>{title}</h3>
      <p title={artist}>{artist}</p>

      <div className="song-buttons">
        <button
          type="button"
          onClick={() => onPlay && onPlay(song)}
          title="Play"
          aria-label={`Play ${title}`}
        >
          <Play size={18} />
        </button>

        <button
          type="button"
          onClick={() => onLike && onLike(song)}
          title={isLiked ? "Unlike" : "Like"}
          aria-label={isLiked ? `Unlike ${title}` : `Like ${title}`}
        >
          <Heart
            size={18}
            fill={isLiked ? "currentColor" : "none"}
          />
        </button>

        <button
          type="button"
          onClick={() => onAdd && onAdd(song)}
          title="Add to playlist"
          aria-label={`Add ${title} to playlist`}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}

export default SongCard;