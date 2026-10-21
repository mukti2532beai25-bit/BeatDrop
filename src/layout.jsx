import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/home/SideBar";
import Player from "./components/home/Player";

function Layout() {
    return (
        <div className="app-layout">
            <SideBar />
            
            <main className="main-viewport">
                <Outlet />
            </main>

            <Player />
        </div>
    );
}

export default Layout;
