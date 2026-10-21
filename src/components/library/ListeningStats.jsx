import React from "react";
import { Headphones, Music, UserPlus, Flame } from "lucide-react";
import { LISTENING_STATS } from "../../data";

function ListeningStats() {
    return (
        <section className="library-section">
            <div className="qaheading">
                <div>
                    <p className="qalabel">YOUR ACTIVITY</p>
                    <h2>Listening stats</h2>
                </div>
            </div>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <Headphones size={22} />
                    </div>
                    <div>
                        <span>Listening time</span>
                        <strong>
                            {LISTENING_STATS.listeningTime}
                        </strong>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <Music size={22} />
                    </div>
                    <div>
                        <span>Songs played</span>
                        <strong>
                            {LISTENING_STATS.songsPlayed}
                        </strong>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <UserPlus size={22} />
                    </div>
                    <div>
                        <span>Artists discovered</span>
                        <strong>
                            {LISTENING_STATS.artistsDiscovered}
                        </strong>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <Flame size={22} />
                    </div>
                    <div>
                        <span>Listening streak</span>
                        <strong>
                            {LISTENING_STATS.listeningStreak} days
                        </strong>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ListeningStats;