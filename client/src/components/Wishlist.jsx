import axios from "axios";
import { useState, useContext } from "react";
import coinSound from "../assets/MarioCoinSound.mp3";
import { WishContext } from "./App";

const Wishlist = ({ setWishlist }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const wishlist = useContext(WishContext);

  const playCoinSound = () => {
    const audio = new Audio(coinSound);
    audio.volume = 0.4;
    audio.play();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`api/games/${searchQuery}`);
      const gameData = response.data;
      console.log(gameData[0]);
      if (gameData.length > 0) {
        const firstGame = gameData[0];

        const newWishlistItem = await axios.post("api/videogames", {
          name: firstGame.name,
          background_image: firstGame.background_image,
          esrb_rating: firstGame.esrb_rating,
          rating: firstGame.rating,
          released: firstGame.released,
        });

        setWishlist([...wishlist, newWishlistItem.data]);
        setSearchQuery("");
      } else {
        console.log("No games found.");
      }
    } catch (error) {
      setError(true);
    }
    setSuggestions([]);
  };

  const getAndSetGameSuggestions = async (inputValue) => {
    try {
      if (inputValue) {
        const response = await axios.get(`api/games/${inputValue}`);
        const gameData = response.data;
        const gameNames = gameData.map((game) => game.name);
        const twentySuggestions = gameNames.slice(0, 20);
        setSuggestions(twentySuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getAndSetGameSuggestions(searchQuery);
    }
  };

  const handleSuggestionClick = async (selectedGame) => {
    setSearchQuery(selectedGame);

    try {
      const response = await axios.get(`api/games/${selectedGame}`);
      const gameData = response.data;

      if (gameData.length > 0) {
        const firstGame = gameData[0];
        const newWishlistItem = await axios.post("api/videogames", {
          name: firstGame.name,
          background_image: firstGame.background_image,
          esrb_rating: firstGame.esrb_rating,
          rating: firstGame.rating,
          released: firstGame.released,
        });

        setWishlist([...wishlist, newWishlistItem.data]);
        setSearchQuery("");
        playCoinSound();
      } else {
        console.log("No games found.");
      }
    } catch (error) {
      setError(true);
    }
    setSuggestions([]);
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

  const mustEnterWishlistItem = (e) => {
    e.preventDefault();
    setTimeout(() => {
      e.target[0].placeholder = "";
    }, 2000);
    e.target[0].placeholder = "Please search for an item";
  };

  return (
    <div className="w-5/6 mx-auto flex-col gap-2 rounded-b bg-gradient-to-r from-blue-200/40 to-blue-500/40 mb-10 p-2 mb-10">
      <div className="flex md:flex-row flex-col mb-2 gap-2">
        {error && (
          <div
            className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-1 rounded relative md:w-1/2 w-full md:order-1"
            role="alert"
          >
            <span>Item already in wishlist!</span>
            <span className="absolute top-0 bottom-0 right-0">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() => setError(false)}
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
        <form
          onSubmit={searchQuery !== "" ? handleSearch : mustEnterWishlistItem}
          className="md:w-1/2 w-full"
        >
          <input
            type="text"
            name="search"
            id="search"
            autoFocus
            placeholder="Search"
            className="p-1 bg-slate-400/20 text-white border-2 border-slate-950 rounded placeholder:text-white w-full"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </form>
      </div>
      {/* Suggestions */}
      <div
        className={`${
          suggestions.length !== 0
            ? "absolute left-30 overflow-y-auto max-h-80"
            : "hidden"
        } bg-slate-700 border-2 border-slate-900 rounded text-white z-10 w-96`}
      >
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-2 hover:bg-gray-500"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
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
