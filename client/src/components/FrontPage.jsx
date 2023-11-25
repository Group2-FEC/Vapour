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
			<div className="mx-auto grid grid-cols-3 px-2">
				{games.length !== 0 ? (
					games.map((game) => {
						return (
							<div key={game.id} className="pb-2">
								<img
									src={game.background_image}
									alt="games"
									className="h-60 w-[100%]"
								/>
								<p className="text-white font-bold">{game.name}</p>
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
