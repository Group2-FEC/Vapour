const GameInfo = ({
	gameInfo,
	gameInfo: { name, metacritic, esrb_rating, platforms, description, website },
	handleCloseButton,
}) => {
	return (
		<div className="w-4/6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-10 rounded shadow-[0_0_15px_black] border border-blue-300/50">
			<div className="absolute right-1 top-1 cursor-pointer">
				<svg
					width="50px"
					height="50px"
					viewBox="0 0 24 24"
					onClick={handleCloseButton}
				>
					<path
						d="M8.00191 9.41621C7.61138 9.02569 7.61138 8.39252 8.00191 8.002C8.39243 7.61147 9.0256 7.61147 9.41612 8.002L12.0057 10.5916L14.5896 8.00771C14.9801 7.61719 15.6133 7.61719 16.0038 8.00771C16.3943 8.39824 16.3943 9.0314 16.0038 9.42193L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.004C15.6133 16.3945 14.9802 16.3945 14.5896 16.004L12.0057 13.42L9.42192 16.0038C9.03139 16.3943 8.39823 16.3943 8.00771 16.0038C7.61718 15.6133 7.61718 14.9801 8.00771 14.5896L10.5915 12.0058L8.00191 9.41621Z"
						fill="#ffffff"
					/>
				</svg>
			</div>
			{Object.keys(gameInfo).length !== 0 && (
				<div className="flex flex-col gap-2">
					<p className="font-bold text-3xl">{name}</p>
					<div className="font-bold">
						<span>Metacritic: </span>
						<span className="underline">{metacritic}</span>
					</div>
					<div className="font-bold">
						<span>ESRB: </span>
						<span className="underline">
							{esrb_rating ? esrb_rating.name : "Not Rated"}
						</span>
					</div>
					<div className="flex gap-2 font-bold">
						<span>Platforms: </span>
						<ul className="flex gap-2 underline">
							{platforms.map(({ platform: { id, name } }) => {
								return <li key={id}>{name}</li>;
							})}
						</ul>
					</div>
					<div
						className="flex flex-col text-slate-950 gap-4 bg-blue-200/70 rounded p-4"
						dangerouslySetInnerHTML={{ __html: description }}
					/>
					<a href={website} target="_blank" className="underline">
						Game website
					</a>
				</div>
			)}
		</div>
	);
};

export default GameInfo;
