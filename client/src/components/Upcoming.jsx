import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { GameDetails } from "./App";
const Upcoming = () => {
  const [upcoming, setUpcoming] = useState([]);
  const notFoundImg = `https://placehold.co/600x400@2x/png?text=Image+Not+Found`;
  const getGameDetails = useContext(GameDetails);

  const getUpcomingGames = async () => {
    try {
      const response = await axios.get("api/upcoming");
      setUpcoming(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUpcomingGames();
  }, []);

  return (
    <div className="relative">
      <div className="w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 rounded-b bg-gradient-to-r from-blue-200/40 to-blue-500/40 mb-10 p-2">
        {upcoming.length !== 0 ? (
          upcoming.map((game) => {
            return (
              <div
                key={game.id}
                className="flex flex-col items-center relative rounded cursor-pointer"
                onClick={() => getGameDetails(game.id)}
              >
                <img
                  src={
                    game.background_image ? game.background_image : notFoundImg
                  }
                  alt="games"
                  className="lg:w-84 lg:h-40 md:h-56 w-full rounded shadow-xl"
                />
                <p className="absolute bottom-0 font-bold text-center bg-slate-800/80 text-slate-200  p-1 border-t border-slate-600 w-full rounded-b">
                  {game.name}
                </p>
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

export default Upcoming;
