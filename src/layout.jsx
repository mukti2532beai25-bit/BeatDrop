import SideBar from "./components/home/SideBar";
import Player from "./components/home/Player";

function Layout({ children }) {
    return (
        <div className="app-layout">

            <SideBar />

            <main className="main-content">
                {children}
            </main>

            <Player />

        </div>
    );
}

export default Layout;