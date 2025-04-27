import { BrowserRouter, Route, Routes } from "react-router-dom";
import Popular from "./Components/Popular";
import AnimeItem from "./Components/AnimeItem";
import Homepage from "./Components/Homepage";
import LoginPage from "./Components/LoginPage";
import { useGlobalContext } from "./context/global";
import Gallery from "./Components/Gallery";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { isAuthenticated } = useGlobalContext();

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<LoginPage />} />
        ) : (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/anime/:id" element={<AnimeItem />} />
            <Route path="/character/:id" element={<Gallery />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
