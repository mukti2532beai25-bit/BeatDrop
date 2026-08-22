function LibraryHeader() {
    return (
        <div className="lbheader">
            <div>
                <p className="lbname">YOUR MUSIC</p>
                <h1>Your <span>Library</span></h1>
                <p className="lbdescription">Everything you love,all in one place.</p>
            </div>
            <div className="lb-btns">
                <button>
                    <i className="fa-solid fa-plus"></i>
                </button>
                <button>
                    <i className="fa-solid fa-grip"></i>
                </button>
            </div>
        </div>
    );
}

export default LibraryHeader;