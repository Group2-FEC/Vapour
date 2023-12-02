import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import FrontPage from "./FrontPage";
import GameInfo from "./GameInfo";
import Library from "./Library";
import Wishlist from "./Wishlist";
import Footer from "./Footer";
import Upcoming from "./Upcoming";
import GameCarousel from "./GameCarousel";
const WishContext = createContext();
export { WishContext };
const GameDetails = createContext();
export { GameDetails };
const App = () => {
  const [gameInfo, setGameInfo] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const getGameDetails = async (id) => {
    try {
      const response = await axios.get(`/api/game/${id}`);
      setGameInfo(response.data);
      setShowInfo(!showInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const getWishlist = async () => {
    try {
      const response = await axios.get("api/videogames");
      setWishlist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const handleCloseButton = () => {
    setShowInfo(!showInfo);
  };

  return (
    //Routes ruins the beauty of useContext
    //I couldn't sandwich FrontPage, Upcoming, and Library together with GameDetails.
    <div className="min-h-[100dvh]">
      <WishContext.Provider value={wishlist}>
        <Header />
      </WishContext.Provider>
      <Routes>
        <Route
          path="/"
          element={
            <GameDetails.Provider value={getGameDetails}>
              <FrontPage />
            </GameDetails.Provider>
          }
        ></Route>
        <Route
          path="/upcoming"
          element={
            <GameDetails.Provider value={getGameDetails}>
              <Upcoming />
            </GameDetails.Provider>
          }
        ></Route>
        <Route
          path="/library"
          element={
            <GameDetails.Provider value={getGameDetails}>
              <Library />
            </GameDetails.Provider>
          }
        ></Route>
        <Route
          path="/wishlist"
          element={
            <WishContext.Provider value={wishlist}>
              <Wishlist setWishlist={setWishlist} />
            </WishContext.Provider>
          }
        ></Route>
      </Routes>
      {showInfo && (
        <GameInfo gameInfo={gameInfo} handleCloseButton={handleCloseButton} />
      )}
      <Footer />
    </div>
  );
};

export default App;
