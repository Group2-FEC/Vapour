import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import FrontPage from "./FrontPage";
import GameInfo from "./GameInfo";
import Library from "./Library";
import Wishlist from "./Wishlist";
import Footer from "./Footer";
import Upcoming from "./Upcoming";
// import ModelReference from "./ModelReference";
const App = () => {
  const [gameInfo, setGameInfo] = useState({});
  const [showInfo, setShowInfo] = useState(false);

  const getGameDetails = async (id) => {
    try {
      const response = await axios.get(`/api/game/${id}`);
      setGameInfo(response.data);
      setShowInfo(!showInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseButton = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="min-h-[100dvh]">
      <Header />
      <Upcoming getGameDetails={getGameDetails} />
      <Wishlist getGameDetails={getGameDetails} />
      <FrontPage getGameDetails={getGameDetails} />
      <Library getGameDetails={getGameDetails} />
      {showInfo && (
        <GameInfo gameInfo={gameInfo} handleCloseButton={handleCloseButton} />
      )}
      <Footer />
    </div>
  );
};

export default App;
