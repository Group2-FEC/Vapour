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

        const postResponse = await axios.post("api/videogames", {
          name: firstGame.name,
          background_image: firstGame.background_image,
          esrb_rating: firstGame.esrb_rating,
          rating: firstGame.rating,
          released: firstGame.released,
        });

        setWishlist([...wishlist, postResponse.data]);
        setSearchQuery("");
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
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <div
        id="wishlist"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
      >
        {/* Render wishlist items */}
        {wishlist.length !== 0 ? (
          wishlist.map((game) => (
            <div
              key={game.id}
              className="flex flex-col items-center relative rounded"
            >
              <img
                src={game.background_image}
                alt="games"
                className="lg:w-84 lg:h-40 md:h-56 w-full rounded shadow-xl"
              />
              <div className="absolute top-1 right-1">
                <svg
                  className="cursor-pointer"
                  width="26px"
                  height="26px"
                  viewBox="0 0 24 24"
                  onClick={() => deleteGame(game.id)}
                >
                  <path
                    d="M8.00191 9.41621C7.61138 9.02569 7.61138 8.39252 8.00191 8.002C8.39243 7.61147 9.0256 7.61147 9.41612 8.002L12.0057 10.5916L14.5896 8.00771C14.9801 7.61719 15.6133 7.61719 16.0038 8.00771C16.3943 8.39824 16.3943 9.0314 16.0038 9.42193L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.004C15.6133 16.3945 14.9802 16.3945 14.5896 16.004L12.0057 13.42L9.42192 16.0038C9.03139 16.3943 8.39823 16.3943 8.00771 16.0038C7.61718 15.6133 7.61718 14.9801 8.00771 14.5896L10.5915 12.0058L8.00191 9.41621Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
              <p className="absolute bottom-0 font-bold text-center bg-slate-800/80 text-slate-200  p-1 border-t border-slate-600 w-full rounded-b">
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
