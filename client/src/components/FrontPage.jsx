import axios from "axios";
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
	return (
		<div className="relative">
			<div className="w-5/6 mx-auto grid grid-cols-3 gap-2 rounded-b bg-gradient-to-r from-blue-200/40 to-blue-500/40 mb-10 p-2">
				{games.length !== 0 ? (
					games.map((game) => {
						return (
							<div
								key={game.id}
								className="shadow-xl cursor-pointer"
								onClick={() => getGameDetails(game.id)}
								data-modal-target="default-modal"
								data-modal-toggle="default-modal"
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
				<div
					className="text-white absolute top-1 bg-slate-800 m-28 p-10 rounded"
					onClick={() => setShowInfo(false)}
				>
					{Object.keys(gameInfo).length !== 0 && (
						<div className="flex flex-col gap-2">
							<p className="font-bold text-2xl underline">{gameInfo.name}</p>
							<div className="font-bold">
								<span>Metacritic: </span>
								<span className="underline">{gameInfo.metacritic}</span>
							</div>
							<div className="font-bold">
								<span>ESRB: </span>
								<span className="underline">{gameInfo.esrb_rating.name}</span>
							</div>
							<div className="flex gap-2 font-bold">
								<span>Platforms: </span>
								<ul className="flex gap-2 underline">
									{gameInfo.platforms.map((platform) => {
										return (
											<div key={platform.platform.id}>
												<li>{platform.platform.name} </li>
											</div>
										);
									})}
								</ul>
							</div>
							<div dangerouslySetInnerHTML={{ __html: gameInfo.description }} />
							<a href={gameInfo.website} target="_blank" className="underline">
								Game website
							</a>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default FrontPage;
