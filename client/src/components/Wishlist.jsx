import axios from "axios";
import { useState } from "react";

const Wishlist = ({ wishlist, setWishlist }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`api/games/${searchQuery}`);
      const gameData = response.data;
      console.log(gameData[0]);
      if (gameData.length > 0) {
        const firstGame = gameData[0];
        // const firstGameResponse = await axios.get(`api/games/${firstGame.name}`);
        // const firstGame = firstGameResponse.data;

        await axios.post("api/videogames", {
          name: firstGame.name,
          background_image: firstGame.background_image,
          esrb_rating: firstGame.esrb_rating,
          rating: firstGame.rating,
          released: firstGame.released,
        });

        setWishlist([...wishlist, firstGame]);
      } else {
        console.log("No games found.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGame = async (gameId) => {
    try {
      await axios.delete(`/api/videogames/${gameId}`);
      // Update the wishlist state after successful deletion
      const updatedWishlist = wishlist.filter((game) => game.id !== gameId);
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error(error);
    }
  };

  //onClick render wishlist and remove library component
  return (
    <div className="w-5/6 mx-auto flex flex-col gap-2 rounded-b bg-gradient-to-r from-blue-200/40 to-blue-500/40 mb-10 p-2 mb-10">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Add to Wishlist"
        className="p-1 mb-2 w-48"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <div
        id="wishlist"
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
      >
        {/* Render wishlist items */}
        {wishlist.length !== 0 ? (
          wishlist.map((game) => (
            <div
              key={game.id}
              className="flex flex-col items-center relative rounded cursor-pointer"
            >
              <img
                src={game.background_image}
                alt="games"
                className="md:h-36 sm:w-80 sm:h-48 w-full rounded shadow-xl"
                onDoubleClick={() => deleteGame(game.id)}
              />
              <p className="text-slate-200 font-bold text-sm absolute bottom-0 bg-slate-800/80 text-center p-1  border-t border-slate-600 w-full rounded-b">
                {game.name}
              </p>
              {/* <p className="text-slate-200 font-bold text-sm">
                {game.esrb_rating}
              </p> */}
              {/* <p className="text-slate-200 font-bold text-sm">{game.rating}</p> */}
              {/* <p className="text-slate-200 font-bold text-sm">
                {game.released}
              </p> */}
            </div>
          ))
        ) : (
          <p className="text-white font-bold">No items in the wishlist</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
