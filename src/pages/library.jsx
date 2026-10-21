import "./Library.css";
import LibraryHeader from "../components/library/LibraryHeader";
import QuickAccess from "../components/library/QuickAccess";
import MadeForYou from "../components/library/MadeForYou";
import RecentlyPlayed from "../components/library/RecentlyPlayed";
import ListeningStats from "../components/library/ListeningStats";
import MusicDNA from "../components/library/MusicDNA";
import LibraryCollection from "../components/library/LibraryCollection";

function Library() {
    return (
        <div className="library-page-scroll" style={{ width: "100%", height: "100%", overflowY: "auto", boxSizing: "border-box" }}>
            <main className="lbpage">
                <LibraryHeader />
                <QuickAccess />
                <MadeForYou />
                <RecentlyPlayed />
                <ListeningStats />
                <MusicDNA />
                <LibraryCollection />
            </main>
        </div>
    );
}

export default Library;