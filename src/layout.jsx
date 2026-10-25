import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/home/SideBar";
import Player from "./components/home/Player";
import { PlayerProvider } from "./player/PlayerContext";

function Layout() {
  return (
    <PlayerProvider>
      <div className="app-layout">
        <SideBar />

        <main className="main-viewport">
          <Outlet />
        </main>

        <Player />
      </div>
    </PlayerProvider>
  );
}

export default Layout;
