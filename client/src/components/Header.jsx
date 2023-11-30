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
					className="w-5/6 mx-auto flex md:justify-between justify-center items-center bg-gradient-to-r from-blue-400 to-blue-800 rounded-t p-2"
				>
					<div className="flex gap-2 text-white font-bold sm:gap-5">
						<Navbar wishlist={wishlist} />
					</div>
				</div>
			</header>
		</div>
	);
};

export default Header;
