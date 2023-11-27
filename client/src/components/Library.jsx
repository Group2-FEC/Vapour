import axios from "axios";
import search from "../img/icons/search.png";
import { useEffect, useState } from "react";

const Library = () => {
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
			<div className="flex justify-center">
				<input
					type="text"
					name="search"
					id="search"
					placeholder="search"
					className="p-1 w-1/3 rounded shadow"
				/>
				<img src={search} alt="search" className="invert w-8 h-8 p-1" />
			</div>
			<div
				id="gallery"
				className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 border-l border-white/40 gap-2 pl-2"
			>
				{library.length !== 0 ? (
					library.map((game) => (
						<div key={game.id} className="flex flex-col items-center mb-2">
							<img
								src={game.background_image}
								alt="games"
								className="w-full h-full rounded shadow-xl border border-white/40 mb-2"
							/>
							<p className="text-slate-200 font-bold text-sm">{game.name}</p>
						</div>
					))
				) : (
					<p className="text-white font-bold">Loading images</p>
				)}
			</div>
		</div>
	);
};

export default Library;
