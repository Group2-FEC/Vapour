import axios from "axios";
import GameInfo from "./GameInfo";
import { useEffect, useState } from "react";

const FrontPage = () => {
	const [games, setGames] = useState([]);
	const [gameInfo, setGameInfo] = useState({});
	const [showInfo, setShowInfo] = useState(false);

	const getGames = async () => {
		try {
			const response = await axios.get("/api/games");
			setGames(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const getGameDetails = async (id) => {
		try {
			const response = await axios.get(`/api/game/${id}`);
			setGameInfo(response.data);
			setShowInfo(true);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getGames();
	}, []);

	const handleCloseButton = () => {
		setGameInfo(false);
	};

	return (
		<div className="relative" onClick={() => setShowInfo(false)}>
			<div className="w-5/6 mx-auto grid grid-cols-3 gap-2 rounded-b bg-gradient-to-r from-blue-200/40 to-blue-500/40 mb-10 p-2">
				{games.length !== 0 ? (
					games.map((game) => {
						return (
							<div
								key={game.id}
								className="shadow-xl cursor-pointer"
								onClick={() => getGameDetails(game.id)}
							>
								<img
									src={game.background_image}
									alt="games"
									className="h-48 w-full rounded-t"
								/>
								<p className="text-center text-white text-xl font-bold bg-blue-400/30 rounded-b border-b-4 border-blue-300/60">
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
			{showInfo && (
				<GameInfo gameInfo={gameInfo} handleCloseButton={handleCloseButton} />
			)}
		</div>
	);
};

export default FrontPage;
