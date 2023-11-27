import Header from "./Header";
import FrontPage from "./FrontPage";
import Footer from "./Footer";
//import Library from "./Library";
// import ModelReference from "./ModelReference";
import Wishlist from "./Wishlist";
const App = () => {
	return (
		<div className="min-h-[100dvh]">
			<Header />
			{/* <FrontPage/> */}
			{/*<Library /> */}
			<Wishlist/>
			<Footer />
		</div>
	);
};

export default App;
