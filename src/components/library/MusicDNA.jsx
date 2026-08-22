import React from "react";
import { Fingerprint } from "lucide-react";
import { MUSIC_DNA } from "../../data";

function MusicDNA() {
    return (
        <section className="library-section">
            <div className="qaheading">
                <div>
                    <p className="qalabel">YOUR TASTE</p>
                    <h2>Your music DNA</h2>
                </div>
            </div>
            <div className="dna-card">
                <div className="dna-description">
                    <div className="dna-icon">
                        <Fingerprint size={24} />
                    </div>
                    <div>
                        <h3>Your sound in numbers</h3>
                        <p>A snapshot of the genres you listen to the most.</p>
                    </div>
                </div>
                <div className="dna-list">
                    {MUSIC_DNA.map((item) => (
                        <div className="dna-row" key={item.genre}>                    
                            <div className="dna-title">
                                <span>{item.genre}</span>
                                <strong>{item.percentage}%</strong>
                            </div>
                            <div className="dna-bar">
                                <div className="dna-progress" style={{width: `${item.percentage}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default MusicDNA;