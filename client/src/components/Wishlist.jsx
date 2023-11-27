import axios from "axios";
import { useState } from "react";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    const getWishlist = async () => {
		try {
			const response = await axios.post("api/videogames");
			setWishlist(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	//onClick render wishlist and remove library component
	return (
		<div className="w-5/6 mx-auto flex gap-2 rounded-b bg-gradient-to-r from-blue-200/40 to-blue-500/40 mb-10 p-2 mb-10">
        <div id="wishlist" className="w-1/6 flex  flex-col gap-2">
        <input type="text" name="search" id="search" placeholder="search" className="p-1"/>
        {wishlist.length !== 0 ? (
            wishlist.map((game) => (
                <p className="text-slate-200 font-bold text-sm">{game.name}</p>
            ))
        ) : (
            <p className="text-white font-bold">Loading Wishlist</p>
        )}
    </div>
			<div
				id="gallery"
				className="w-5/6 grid grid-cols-5 border-l border-white/40 gap-2 pl-2"
			>
				{wishlist.length !== 0 ? (
					wishlist.map((game) => (
						<img src={game.background_image} alt="games" className="h-full rounded shadow-xl border border-white/40" />
					))
				) : (
					<p className="text-white font-bold">Loading images</p>
				)}
			</div>
		</div>
	);
};

export default Wishlist;