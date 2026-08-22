import { RECENTLY_PLAYED } from "../../data";
function RecentlyPlayed() {
    return (
        <section className="library-section">
            <div className="qaheading">
                <div>
                    <p className="qalabel">HISTORY</p>
                    <h2>Recently played</h2>
                </div>
                <button className="seeall-btn">
                    See all
                </button>
            </div>
            <div className="rpcard">
                {RECENTLY_PLAYED.map((song, index) => (
                    <div className="recentsong"key={song}>
                        <span className="songno">
                            {index + 1}
                        </span>
                        <img src={song.cover} alt={song.title} className="songimg"/>
                        <div className="songinfo">
                            <h3> {song.title}</h3>
                            <p>{song.artist}</p>
                        </div>
                        <span className="songlist">{song.album}</span>
                        <span className="songtime">{song.duration}</span>
                        <button className="song-btn">
                            <i className="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
export default RecentlyPlayed;