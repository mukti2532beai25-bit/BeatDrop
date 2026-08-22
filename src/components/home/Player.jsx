import React, { useState } from 'react';
import { 
  Play, SkipBack, SkipForward, Shuffle, Repeat, 
  Volume2, Heart, Mic2, ListMusic, MonitorSpeaker 
} from 'lucide-react';
import './Player.css';

export default function Player() {
  const [volume, setVolume] = useState(60);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const volumeSliderStyle = {
    background: `linear-gradient(to right, #D4FF32 ${volume}%, #444 ${volume}%)`
  };

  return (
    <div className="player-container">
      
      <div className="player-left">
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500" 
          alt="Album Cover" 
          className="album-art"
        />
        <div className="song-info">
          <h4>Summer Nights</h4>
          <p>The Midnight</p>
        </div>
        <button className="icon-btn heart-btn" title="Like song">
          <Heart size={18} fill="#D4FF32" color="#D4FF32" />
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className="icon-btn" title="Shuffle"><Shuffle size={18} /></button>
          <button className="icon-btn" title="Previous"><SkipBack size={20} /></button>
          
          <button className="play-pause-btn" title="Play / Pause">
            <Play size={20} fill="#121212" color="#121212" />
          </button>
          
          <button className="icon-btn" title="Next"><SkipForward size={20} /></button>
          <button className="icon-btn" title="Repeat"><Repeat size={18} /></button>
        </div>
        
        <div className="progress-container">
          <span className="time-text">1:07</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill"></div>
          </div>
          <span className="time-text">3:42</span>
        </div>
      </div>

      <div className="player-right">
        <button className="icon-btn" title="Lyrics">
          <Mic2 size={18} />
        </button>
        <button className="icon-btn" title="Connect to a device">
          <MonitorSpeaker size={18} />
        </button>
        <div className="volume-container">
          <Volume2 size={18} className="volume-icon" />
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            style={volumeSliderStyle}
            aria-label="Volume"
          />
        </div>
      </div>

    </div>
  );
}
