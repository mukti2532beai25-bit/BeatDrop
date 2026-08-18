import { LIBRARY_ITEMS } from "../../data";

function LibraryCollection() {
    return (
        <section className="library-section">
            <div className="collection-header">
                <div>
                    <p className="section-label">YOUR COLLECTION</p>
                    <h2>Your library</h2>
                </div>

                <button className="see-all-button">See all</button>
            </div>
            <div className="library-grid">
                {LIBRARY_ITEMS.map((item) => (
                    <div className="library-card" key={item.id}>
                        <div className="library-card-image">
                            <img src={item.cover} alt={item.title} />
                            <button className="card-play-button">
                                <i className="fa-solid fa-play"></i>
                            </button>
                        </div>
                          <div className="library-card-info">
                            <span>{item.type}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default LibraryCollection;