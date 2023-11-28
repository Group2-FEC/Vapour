import search from "../img/icons/search.png";
import notification from "../img/icons/notification.png";
import announcement from "../img/icons/announcement.png";
import userImage from "../img/icons/user.png";
const Header = () => {
	const storeLinks = [
		"Store",
		"New",
		"Categories",
		"Shop",
		"News",
		"Labs",
		"Wishlist(5)",
	];
	const userLinks = ["Store", "Library", "Community", "CoolDude99"];

	return (
		<div className="bg-slate-700/70 border-b border-gray-600">
			<header>
				<div
					id="userBar"
					className="flex justify-end items-center px-5 pt-1 gap-2"
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
				<div id="userLinks" className="md:flex justify-center gap-5">
					{userLinks.map((link, index) => (
						<p
							key={index}
							className="text-slate-100 font-bold text-lg uppercase p-2"
						>
							{link}
						</p>
					))}
				</div>
				<div
					id="storeLinks"
					className="w-5/6 mx-auto flex justify-between items-center bg-gradient-to-r from-blue-400 to-blue-800 rounded-t"
				>
					<div className="flex flex-col md:flex-row gap-5 items-center md:pr-1 pl-2">
						{storeLinks.map((link, index) => (
							<p
								key={index}
								className="text-slate-100 font-bold text-sm uppercase"
							>
								{link}
							</p>
						))}
					</div>
					<div className="flex p-1 mt-2 md:mt-0 md:self-end w-full md:w-auto">
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
