function LibraryHeader() {
    return (
        <div className="library-header">
            <div>
                <p className="library-label">YOUR MUSIC</p>
                <h1>Your <span>Library</span></h1>
                <p className="library-description">Everything you love,all in one place.</p>
            </div>
            <div className="library-actions">
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