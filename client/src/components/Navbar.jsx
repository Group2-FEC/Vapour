import { Link } from "react-router-dom";
const Navbar = ({ wishlist }) => {
	return (
		<>
			<Link to={"/"}>Home</Link>
			<Link to={"/library"}>Library</Link>
			<Link to={"/upcoming"}>Upcoming</Link>
			<Link to={"/wishlist"}>{wishlist.length !== 0 ? `Wishlist (${wishlist.length})` : `Wishlist`}</Link>
		</>
	);
};

export default Navbar;
