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
    background: `linear-gradient(to right, white ${volume}%, #444 ${volume}%)`
  };

  return (
    <div className="player-container">
      
      <div className="player-left">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" 
          alt="Album Cover" 
          className="album-art"
        />
        <div className="song-info">
          <h4>Falling</h4>
          <p>Maya Sorenson</p>
        </div>
        <button className="icon-btn heart-btn"><Heart size={18} fill="#D4FF32" color="#D4FF32" /></button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className="icon-btn"><Shuffle size={18} /></button>
          <button className="icon-btn"><SkipBack size={20} /></button>
          
          <button className="play-pause-btn">
            <Play size={20} fill="#121212" color="#121212" />
          </button>
          
          <button className="icon-btn"><SkipForward size={20} /></button>
          <button className="icon-btn"><Repeat size={18} /></button>
        </div>
        
        <div className="progress-container">
          <span className="time-text">1:07</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill"></div>
          </div>
          <span className="time-text">3:24</span>
        </div>
      </div>

      <div className="player-right">
        <button className="icon-btn"><ListMusic size={18} /></button>
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
          />
        </div>
      </div>

    </div>
  );
}