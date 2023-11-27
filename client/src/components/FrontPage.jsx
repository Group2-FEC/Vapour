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
		<div className="relative" onClick={() => setShowInfo(false)}>
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
				<div className="w-4/6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-10 rounded shadow-[0_0_15px_black]">
					<div className="absolute right-1 top-1 cursor-pointer">
						<svg
							width="50px"
							height="50px"
							viewBox="0 0 24 24"
							onClick={() => setShowInfo(false)}
						>
							<path
								d="M8.00191 9.41621C7.61138 9.02569 7.61138 8.39252 8.00191 8.002C8.39243 7.61147 9.0256 7.61147 9.41612 8.002L12.0057 10.5916L14.5896 8.00771C14.9801 7.61719 15.6133 7.61719 16.0038 8.00771C16.3943 8.39824 16.3943 9.0314 16.0038 9.42193L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.004C15.6133 16.3945 14.9802 16.3945 14.5896 16.004L12.0057 13.42L9.42192 16.0038C9.03139 16.3943 8.39823 16.3943 8.00771 16.0038C7.61718 15.6133 7.61718 14.9801 8.00771 14.5896L10.5915 12.0058L8.00191 9.41621Z"
								fill="#ffffff"
							/>
						</svg>
					</div>
					{Object.keys(gameInfo).length !== 0 && (
						<div className="flex flex-col gap-2">
							<p className="font-bold text-3xl">{gameInfo.name}</p>
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
							<div
								className="flex flex-col text-slate-950 gap-4 bg-blue-200/70 rounded p-4"
								dangerouslySetInnerHTML={{ __html: gameInfo.description }}
							/>
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
