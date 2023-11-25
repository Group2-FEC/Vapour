const Footer = () => {
	return (
		<footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow flex items-center p-2 bg-gray-800 border-gray-600">
			<div className="text-sm text-blue-200 mx-auto font-bold">
				{new Date().getFullYear().toString()} | Team Steam
			</div>
		</footer>
	);
};

export default Footer;
