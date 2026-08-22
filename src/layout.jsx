import SideBar from "./components/home/SideBar";
import Player from "./components/home/Player";
import "./layout.css";

function Layout({ children }) {
    return (
        <div className="app-layout">
            <SideBar />

            <main className="layout-main">
                {children}
            </main>

            <Player />
        </div>
    );
}

export default Layout;