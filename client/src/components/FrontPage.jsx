import axios from "axios";
import { useEffect, useState } from "react";

const FrontPage = () => {
	const [games, setGames] = useState([]);

	const getGames = async () => {
		try {
			const response = await axios.get("/api/games");
			setGames(response.data.games);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getGames();
	}, []);
	return (
		<>
			<div className="w-5/6 mx-auto grid grid-cols-3 m-2 rounded bg-gradient-to-r from-blue-400/50 to-blue-800/50 mb-10">
				{games.length !== 0 ? (
					games.map((game) => {
						return (
							<div
								key={game.id}
								className="m-2 rounded-b bg-slate-500/30 shadow-xl"
							>
								<img
									src={game.background_image}
									alt="games"
									className="h-56 w-[100%]"
								/>
								<p className="text-center text-white text-xl font-bold">
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
		</>
	);
};

export default FrontPage;
