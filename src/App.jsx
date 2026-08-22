import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout";

import BeatDropLanding from "./pages/intro";
import LoginForm from "./pages/loginpage";
import MainContent from "./components/home/MainContent";
import Library from "./pages/library";
import SearchPage from "./pages/search-page";
// import BeatDropSubscription from "./pages/premiumpage";

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
                    element={<LoginForm/>}
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
                            <SearchPage />
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
{/* 
                <Route
                    path="/premium"
                    element={
                        <Layout>
                            <BeatDropSubscription />
                        </Layout>
                    }
                /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;