import notification from "../assets/icons/notification.png";
import announcement from "../assets/icons/announcement.png";
import userImage from "../assets/icons/user.png";
import logo from "../assets/icons/logo.svg";
import Navbar from "./Navbar";

const Header = ({ wishlist }) => {
  return (
    <header className="relative bg-slate-700/70 border-b border-gray-600">
      <img
        src={logo}
        alt="logo"
        className="w-80 mx-auto drop-shadow"
        style={{ marginBottom: "-18px" }}
      />
      <div
        id="storeLinks"
        className="w-5/6 mx-auto flex sm:justify-between sm:flex-row flex-col sm:items-center items-end justify-center bg-gradient-to-r from-blue-400 to-blue-800 rounded-t p-2"
      >
        <div className="flex gap-2 text-white font-bold sm:gap-5 sm:order-first order-last">
          <Navbar wishlist={wishlist} />
        </div>
        <div id="userBar" className="flex gap-2">
          <img
            src={announcement}
            alt="announcement"
          />
          <img
            className="sm:w-10 w-8 bg-green-200 p-2 rounded shadow-lg"
            src={notification}
            alt="notification"
          />
          <div className="flex items-center gap-1">
            <img
              className="sm:w-10 w-8 bg-red-200 p-2 rounded shadow-lg"
              src={userImage}
              alt="user"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
