import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./layout";

import BeatDropLanding from "./pages/intro";
import LoginForm from "./pages/loginpage";
import MainContent from "./components/home/MainContent";
import Library from "./pages/library";
import SearchPage from "./pages/search-page";
import BeatDropSubscription from "./pages/premiumpage";
<<<<<<< HEAD
import Callback from "./auth/Callback";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
=======
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac

function App() {
    return (
        <BrowserRouter>
<<<<<<< HEAD
            <AuthProvider>
=======
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
            <Routes>
                <Route
                    path="/"
                    element={<BeatDropLanding />}
                />

                <Route
                    path="/login"
                    element={<LoginForm/>}
                />

<<<<<<< HEAD
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/home" element={<MainContent />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/library" element={<Library />} />
                    </Route>
=======
                <Route element={<Layout />}>
                    <Route path="/home" element={<MainContent />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/library" element={<Library />} />
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
                </Route>

                <Route
                    path="/premium"
                    element={<BeatDropSubscription />}
                />
<<<<<<< HEAD

                <Route
                    path="/callback" 
                    element={<Callback />} 
                />
            </Routes>
            </AuthProvider>
=======
            </Routes>
>>>>>>> 7ba739941c3c91e6d3e6dd385effa0a8e478e6ac
        </BrowserRouter>
    );
}

export default App;