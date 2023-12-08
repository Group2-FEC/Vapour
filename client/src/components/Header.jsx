import notification from "../assets/icons/notification.png";
import announcement from "../assets/icons/announcement.png";
import userImage from "../assets/icons/user.png";
import logo from "../assets/icons/logo.svg";
import Navbar from "./Navbar";
const Header = () => {
  return (
    <header className="relative bg-blue-950/30 border-b border-blue-900 shadow-xl">
      <img
        src={logo}
        alt="logo"
        className="w-80 mx-auto drop-shadow"
        style={{ marginBottom: "-30px" }}
      />
      <div
        id="storeLinks"
        className="w-5/6 mx-auto flex sm:justify-between sm:flex-row flex-col sm:items-center items-end justify-center bg-gradient-to-r from-blue-400 to-blue-800 rounded-t p-2 gap-1"
      >
        <div className="flex gap-2 text-white font-bold text-sm sm:text-base sm:gap-5 sm:order-first order-last">
          <Navbar />
        </div>
        <div id="userBar" className="flex gap-2">
          <img
            src={announcement}
            alt="announcement"
            className="sm:w-10 w-8 bg-blue-200 p-2 rounded shadow-lg cursor-pointer"
          />
          <div className="relative">
            <img
              className="sm:w-10 w-8 bg-green-200 p-2 rounded shadow-lg cursor-pointer"
              src={notification}
              alt="notification"
            />
            <div
              id="newNotifPlaceholder"
              className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full m-0.5"
            ></div>
          </div>
          <div className="flex items-center gap-1">
            <img
              className="sm:w-10 w-8 bg-red-200 p-2 rounded shadow-lg cursor-pointer"
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
