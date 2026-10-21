import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./layout";

import BeatDropLanding from "./pages/intro";
import LoginForm from "./pages/loginpage";
import MainContent from "./components/home/MainContent";
import Library from "./pages/library";
import SearchPage from "./pages/search-page";
import BeatDropSubscription from "./pages/premiumpage";

import Callback from "./auth/Callback";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import { MusicProvider } from "./context/MusicContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MusicProvider>
          <Routes>
            <Route
              path="/"
              element={<BeatDropLanding />}
            />

            <Route
              path="/login"
              element={<LoginForm />}
            />

            <Route
              path="/callback"
              element={<Callback />}
            />

            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route
                  path="/home"
                  element={<MainContent />}
                />

                <Route
                  path="/search"
                  element={<SearchPage />}
                />

                <Route
                  path="/library"
                  element={<Library />}
                />
              </Route>
            </Route>

            <Route
              path="/premium"
              element={<BeatDropSubscription />}
            />
          </Routes>
        </MusicProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;