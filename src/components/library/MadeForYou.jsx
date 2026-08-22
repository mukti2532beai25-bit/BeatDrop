import React from "react";
import { Play } from "lucide-react";
import { MADE_FOR_YOU } from "../../data";

function MadeForYou() {
    return (
        <section className="library-section">
            <div className="qaheading">
                <div>
                    <p className="qalabel">PERSONALIZED</p>
                    <h2>Made for you</h2>
                </div>
                <button className="seeall-btn">See all</button>
            </div>
            <div className="mfucard">
                {MADE_FOR_YOU.map((mix) => (
                    <div className="mix-card" key={mix.id}>
                        <div className="mix-icon">{mix.icon}</div>
                        <div className="mix-content">
                            <h3>{mix.title}</h3>
                            <p>{mix.description}</p>
                            <span>{mix.type} </span>
                        </div>
                        <button className="mix-btn" title="Play mix">
                            <Play size={16} fill="white" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
export default MadeForYou;