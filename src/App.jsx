import React from 'react';
import SideBar from "./components/home/SideBar.jsx"; 
import MainContent from './components/home/MainContent.jsx'; 
import Player from './components/home/Player.jsx';
import './App.css';

export default function App() {
  return (
    <div id='header'>
      <div className='app-container'>
        <SideBar />
        <MainContent />
      </div>
      <Player />
    </div>
  );
}

