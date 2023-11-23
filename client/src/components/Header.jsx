import search from "../img/icons/search.png";
import notification from "../img/icons/notification.png";
import announcement from "../img/icons/announcement.png";
import userImage from "../img/icons/user.png";
const Header = () => {
	const menuLinks = [
		"Your Store",
		"New & Noteworthy",
		"Categories",
		"Points Shop",
		"News",
		"Labs",
	];
	const userLinks = ["Store", "Library", "Community", "CoolDude99"];
	return (
		<div className="bg-slate-800">
			<header>
				<div
					id="userBar"
					className="flex justify-end items-center px-5 pt-1 gap-5"
				>
					<img
						className="w-10 bg-sky-200 p-2"
						src={announcement}
						alt="announcement"
					/>
					<img
						className="w-10 bg-green-200 p-2"
						src={notification}
						alt="announcement"
					/>
					<div className="flex items-center gap-1">
						<img
							className="w-10 bg-red-200 p-2"
							src={userImage}
							alt="announcement"
						/>
						<p className="font-bold text-red-400">CoolDude99</p>
					</div>
				</div>
				<div id="userLinks" className="flex gap-5 px-5">
					{userLinks.map((link) => (
						<p className="text-slate-100 font-bold text-lg uppercase p-2">
							{link}
						</p>
					))}
				</div>

				<p
					id="wishlist"
					className="text-right rounded-b w-5/6 text-white font-bold uppercase"
				>
					WISHLIST(69)
				</p>
				{/* Figure this out later to add bg. */}
				<div
					id="storeLinks"
					className="w-5/6 mx-auto flex justify-between items-center bg-gradient-to-r from-blue-400 to-blue-800 rounded-t"
				>
					<div className="flex">
						<img className="w-8 p-1" src={userImage} alt="announcement" />
						{menuLinks.map((link) => (
							<p className="text-slate-100 font-bold text-sm uppercase p-2">
								{link}
							</p>
						))}
					</div>
					<div className="flex bg-blue-400 p-1">
						<input
							className="p-1"
							type="text"
							name="search"
							id="search"
							placeholder="search"
						/>
						<img className="w-8 bg-blue-200 p-1" src={search} alt="search" />
					</div>
				</div>
			</header>
		</div>
	);
};

export default Header;
