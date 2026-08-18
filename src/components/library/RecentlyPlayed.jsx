import { RECENTLY_PLAYED } from "../../data";
function RecentlyPlayed() {
    return (
        <section className="library-section">
            <div className="section-heading">
                <div>
                    <p className="section-label">HISTORY</p>
                    <h2>Recently played</h2>
                </div>
                <button className="see-all-button">
                    See all
                </button>
            </div>
            <div className="recently-played-list">
                {RECENTLY_PLAYED.map((song, index) => (
                    <div className="recent-song"key={song}>
                        <span className="song-number">
                            {index + 1}
                        </span>
                        <img src={song.cover} alt={song.title} className="song-cover"/>
                        <div className="song-info">
                            <h3> {song.title}</h3>
                            <p>{song.artist}</p>
                        </div>
                        <span className="song-album">{song.album}</span>
                        <span className="song-duration">{song.duration}</span>
                        <button className="song-more-button">
                            <i className="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
export default RecentlyPlayed;