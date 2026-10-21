import React from "react";
import { Heart, Clock, BarChart3, Download, ChevronRight } from "lucide-react";
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
                            {item.type === "liked" && (<Heart size={20} fill="#8ab52d" />)}
                            {item.type === "recent" && (<Clock size={20} />)}
                            {item.type === "most-played" && (<BarChart3 size={20} />)}
                            {item.type === "downloaded" && (<Download size={20} />)}
                        </div>
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                        <ChevronRight size={16} className="quick-arrow" />
                    </div>
                ))}
            </div>
        </section>
    );
}
export default QuickAccess;