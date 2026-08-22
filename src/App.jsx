import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout";

import BeatDropLanding from "./pages/intro";
import BeatDropSubscriptio from "./pages/loginpage";
import MainContent from "./components/home/MainContent";
import Library from "./pages/library";
import Search from "./pages/search-page";
import PremiumPage from "./pages/premiumpage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<BeatDropLanding />}
                />

                <Route
                    path="/login"
                    element={<BeatDropSubscriptio/>}
                />

                <Route
                    path="/home"
                    element={
                        <Layout>
                            <MainContent />
                        </Layout>
                    }
                />

                <Route
                    path="/search"
                    element={
                        <Layout>
                            <Search />
                        </Layout>
                    }
                />

                <Route
                    path="/library"
                    element={
                        <Layout>
                            <Library />
                        </Layout>
                    }
                />

                <Route
                    path="/premium"
                    element={
                        <Layout>
                            <PremiumPage />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;