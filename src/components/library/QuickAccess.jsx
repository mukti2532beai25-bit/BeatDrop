import { QUICK_ACCESS } from "../../data";

function QuickAccess() {
    return (
        <section className="library-section">
            <div className="qaheading">
                <div>
                    <p className="qalabel">QUICK ACCESS</p>
                    <h2>Jump back in</h2>
                </div>
            </div>

            <div className="qacards">
                {QUICK_ACCESS.map((item) => (
                    <div className="quickcard" key={item.id}>
                      <div className="qaicon">
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