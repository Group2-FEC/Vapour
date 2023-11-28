import axios from "axios";
import search from "../img/icons/search.png";
import GameInfo from "./GameInfo";
import { useEffect, useState } from "react";

const Library = ({ getGameDetails, handleCloseButton, gameInfo, showInfo }) => {
	const [library, setLibrary] = useState([]);

	const getLibrary = async () => {
		try {
			const response = await axios.get("api/library");
			setLibrary(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getLibrary();
	}, []);
	return (
		<div className="w-5/6 mx-auto flex flex-col gap-2 rounded-b bg-gradient-to-r from-blue-200/40 to-blue-500/40 mb-10 p-2 mb-10">
			<div
				id="gallery"
				className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
			>
				{library.length !== 0 ? (
					library.map((game) => (
						<div
							key={game.id}
							className="flex flex-col items-center relative rounded cursor-pointer"
							onClick={() => getGameDetails(game.id)}
						>
							<img
								src={game.background_image}
								alt="games"
								className="md:h-36 sm:w-80 sm:h-48 w-full rounded"
							/>
							<p className="text-slate-200 font-bold text-sm absolute bottom-0 bg-slate-800/80 text-center p-1  border-t border-slate-600 w-full rounded-b">
								{game.name}
							</p>
						</div>
					))
				) : (
					<p className="text-white font-bold">Loading images</p>
				)}
			</div>
			{showInfo && (
				<GameInfo gameInfo={gameInfo} handleCloseButton={handleCloseButton} />
			)}
		</div>
	);
};

export default Library;
