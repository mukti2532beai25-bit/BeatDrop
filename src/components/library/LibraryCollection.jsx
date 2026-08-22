import { LIBRARY_ITEMS } from "../../data";

function LibraryCollection() {
    return (
        <section className="library-section">
            <div className="collection-header">
                <div>
                    <p className="qalabel">YOUR COLLECTION</p>
                    <h2>Your library</h2>
                </div>

                <button className="seeall-btn">See all</button>
            </div>
            <div className="cl-column">
                {LIBRARY_ITEMS.map((item) => (
                    <div className="cl-card" key={item.id}>
                        <div className="cl-img">
                            <img src={item.cover} alt={item.title} />
                            <button className="cl-btn">
                                <i className="fa-solid fa-play"></i>
                            </button>
                        </div>
                          <div className="cl-info">
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