import { MADE_FOR_YOU } from "../../data";

function MadeForYou() {

    return (
        <section className="library-section">
            <div className="section-heading">
                <div>
                    <p className="section-label">PERSONALIZED</p>
                    <h2>Made for you</h2>
                </div>
                <button className="see-all-button">See all</button>
            </div>
            <div className="made-for-you-grid">
                {MADE_FOR_YOU.map((mix) => (
                    <div className="mix-card"key={mix.id}>
                        <div className="mix-icon">{mix.icon}</div>
                        <div className="mix-content">
                            <h3>{mix.title}</h3>
                            <p>{mix.description}</p>
                            <span>{mix.type} </span>
                        </div>
                        <button className="mix-play-button">
                            <i className="fa-solid fa-play"></i>
                        </button>
                    </div>

                ))}
            </div>
        </section>
    );
}
export default MadeForYou;