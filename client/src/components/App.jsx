import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import FrontPage from "./FrontPage";
import Footer from "./Footer";
import Library from "./Library";
// import ModelReference from "./ModelReference";
// import Wishlist from "./Wishlist";
const App = () => {
	const [gameInfo, setGameInfo] = useState({});
	const [showInfo, setShowInfo] = useState(false);

	const getGameDetails = async (id) => {
		try {
			const response = await axios.get(`/api/game/${id}`);
			setGameInfo(response.data);
			setShowInfo(!showInfo);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCloseButton = () => {
		setShowInfo(!showInfo);
	};

	return (
		<div className="min-h-[100dvh]">
			<Header />
			{/* <FrontPage
				getGameDetails={getGameDetails}
				handleCloseButton={handleCloseButton}
				gameInfo={gameInfo}
				showInfo={showInfo}
			/> */}
			<Library
				getGameDetails={getGameDetails}
				handleCloseButton={handleCloseButton}
				gameInfo={gameInfo}
				showInfo={showInfo}
			/>
			<Footer />
		</div>
	);
};

export default App;
