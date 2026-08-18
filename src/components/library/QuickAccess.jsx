import { QUICK_ACCESS } from "../../data";

function QuickAccess() {
    return (
        <section className="library-section">
            <div className="section-heading">
                <div>
                    <p className="section-label">QUICK ACCESS</p>
                    <h2>Jump back in</h2>
                </div>
            </div>

            <div className="quick-access-grid">
                {QUICK_ACCESS.map((item) => (
                    <div className="quick-access-card" key={item.id}>
                      <div className="quick-access-icon">
                            {item.type === "liked" && (<i className="fa-solid fa-heart"></i>)}
                            {item.type === "recent" && ( <i className="fa-solid fa-clock-rotate-left"></i>)}
                            {item.type === "most-played" && (<i className="fa-solid fa-chart-simple"></i>)}
                            {item.type === "downloaded" && ( <i className="fa-solid fa-download"></i>)}
                        </div>
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                        <i className="fa-solid fa-chevron-right quick-arrow"></i>
                    </div>
                ))}
            </div>
        </section>
    );
}
export default QuickAccess;