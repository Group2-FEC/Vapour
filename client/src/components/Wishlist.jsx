import axios from "axios";
import { useState } from "react";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    const getWishlist = async () => {
		try {
			const response = await axios.post("api/videogames");
			setWishlist(response.data);
		} catch (error) {
			console.error(error);
		}
	};

    const handleSearch = async () => {
        try {
          const response = await axios.get(`api/games?search=${searchQuery}`);
          const gameData = response.data;

          if (gameData.length > 0) {
            const firstGame = gameData[0];
            await axios.post('api/videogames', firstGame);
          } else {
            console.log('No games found.');
          }
        } catch (error) {
          console.error(error);
        }
    };

	//onClick render wishlist and remove library component
    return (
        <div className="w-5/6 mx-auto flex gap-2 rounded-b bg-gradient-to-r from-blue-200/40 to-blue-500/40 mb-10 p-2 mb-10">
          <div id="wishlist" className="w-1/6 flex flex-col gap-2">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Add to Wishlist"
              className="p-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            {/* Render wishlist items */}
          </div>
          {/* Render gallery */}
        </div>
      );
    };
  

export default Wishlist;