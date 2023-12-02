import axios from "axios";
import { useEffect, useState, useContext } from "react";
import cart from "../assets/icons/cart.png";
import { GameDetails } from "./App";

const FrontPage = () => {
  const [games, setGames] = useState([]);
  const getGameDetails = useContext(GameDetails);

  const generateRandomPrice = () => {
    return (Math.random() * (70 - 35) + 35).toFixed(2);
  };

  const getGames = async () => {
    try {
      const response = await axios.get("/api/games");
      const gamesWithPrices = response.data.map((game) => ({
        ...game,
        price: generateRandomPrice(),
      }));
      setGames(gamesWithPrices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="relative">
      <div className="w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 rounded-b bg-gradient-to-r from-blue-200/40 to-blue-500/40 mb-10 p-2">
        {games.length !== 0 ? (
          games.map((game) => {
            return (
              <div
                key={game.id}
                className="cursor-pointer relative"
                onClick={() => getGameDetails(game.id)}
              >
                <img
                  src={game.background_image}
                  alt="games"
                  className="lg:w-84 lg:h-50 md:h-56 w-full rounded"
                />
                <p className="absolute bottom-9 font-bold text-center bg-slate-800/80 text-slate-200 text-xl p-0 border-t border-b border-slate-600 w-full">
                  {game.name}
                </p>
                <div className="flex items-center p-1 gap-3 text-slate-200 shadow-xl bg-gradient-to-r from-slate-800/80 to-slate-900/40 font-bold rounded-b">
                  <img src={cart} alt="buy" className="w-8 invert pl-1" />
                  <p>${game.price}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="uppercase text-2xl text-white font-bold">
            Loading games...
          </p>
        )}
      </div>
    </div>
  );
};

export default FrontPage;
