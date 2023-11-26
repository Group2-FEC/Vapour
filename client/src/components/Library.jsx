import axios from "axios";
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
		<div className="w-5/6 mx-auto flex gap-2 rounded-b bg-gradient-to-r from-blue-200/40 to-blue-500/40 mb-10 p-2 mb-10">
			<div id="list" className="w-1/6 flex  flex-col gap-2">
				<input type="text" name="search" id="search" placeholder="search" className="p-1"/>
				{library.length !== 0 ? (
					library.map((game) => (
						<p className="text-slate-200 font-bold text-sm">{game.name}</p>
					))
				) : (
					<p className="text-white font-bold">Loading List</p>
				)}
			</div>
			<div
				id="gallery"
				className="w-5/6 grid grid-cols-5 border-l border-white/40 gap-2 pl-2"
			>
				{library.length !== 0 ? (
					library.map((game) => (
						<img src={game.background_image} alt="games" className="h-full rounded shadow-xl border border-white/40" />
					))
				) : (
					<p className="text-white font-bold">Loading images</p>
				)}
			</div>
		</div>
	);
};

export default Library;
