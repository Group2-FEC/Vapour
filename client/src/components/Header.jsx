import search from "../img/icons/search.png";
import notification from "../img/icons/notification.png";
import announcement from "../img/icons/announcement.png";
import userImage from "../img/icons/user.png";
import Navbar from "./Navbar";

const Header = ({ wishlist }) => {
	return (
		<div className="bg-slate-700/70 border-b border-gray-600">
			<header>
				<div
					id="userBar"
					className="flex justify-end items-center px-5 pt-1 gap-2 py-3"
				>
					<img
						className="w-10 bg-sky-200 p-2 rounded"
						src={announcement}
						alt="announcement"
					/>
					<img
						className="w-10 bg-green-200 p-2 rounded"
						src={notification}
						alt="notification"
					/>
					<div className="flex items-center gap-1">
						<img
							className="w-10 bg-red-200 p-2 rounded"
							src={userImage}
							alt="user"
						/>
					</div>
				</div>

				<div
					id="storeLinks"
					className="w-5/6 mx-auto flex flex-col md:flex-row md:justify-between justify-center items-center bg-gradient-to-r from-blue-400 to-blue-800 rounded-t gap-3 p-2"
				>
					<div className="flex gap-5 text-white font-bold">
						<Navbar wishlist={wishlist} />
					</div>
					<div className="flex justify-center md:justify-end">
						<input
							className="pl-1 bg-blue-900 text-white border-2 border-blue-300 rounded"
							type="text"
							name="search"
							id="search"
							placeholder="search"
						/>
						<img className="w-8 h-8 p-1 invert" src={search} alt="search" />
					</div>
				</div>
			</header>
		</div>
	);
};

export default Header;
