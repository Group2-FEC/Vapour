import Header from "./Header";
import FrontPage from "./FrontPage";
import Footer from "./Footer";
import Library from "./Library";
// import ModelReference from "./ModelReference";
const App = () => {
	return (
		<div className="min-h-[100dvh]">
			<Header />
			<FrontPage/>
			{/* <Library /> */}
			<Footer />
		</div>
	);
};

export default App;
