import notification from "../assets/icons/notification.png";
import announcement from "../assets/icons/announcement.png";
import userImage from "../assets/icons/user.png";
import logo from "../assets/icons/logo.svg";
import Navbar from "./Navbar";
import marioWarCry from "../assets/MarioYahoo.mp3";
import marioMushroom from "../assets/MarioMushroomSound.mp3";
import marioDeath from "../assets/MarioDeath.mp3";
const Header = () => {
  const playMarioWarCry = () => {
    const audio = new Audio(marioWarCry);
    audio.play();
  };

  const playMarioMushroom = () => {
    const audio = new Audio(marioMushroom);
    audio.volume = 0.3;
    audio.play();
  };

  const playMarioDeath = () => {
    const audio = new Audio(marioDeath);
    audio.play();
  };

  return (
    <header className="relative bg-slate-700/70 border-b border-gray-600">
      <img
        src={logo}
        alt="logo"
        className="w-80 mx-auto drop-shadow"
        style={{ marginBottom: "-30px" }}
      />
      <div
        id="storeLinks"
        className="w-5/6 mx-auto flex sm:justify-between sm:flex-row flex-col sm:items-center items-end justify-center bg-gradient-to-r from-blue-400 to-blue-800 rounded-t p-2"
      >
        <div className="flex gap-2 text-white font-bold sm:gap-5 sm:order-first order-last">
          <Navbar/>
        </div>
        <div id="userBar" className="flex gap-2">
          <img
            src={announcement}
            alt="announcement"
            className="sm:w-10 w-8 bg-blue-200 p-2 rounded shadow-lg cursor-pointer"
            onClick={playMarioWarCry}
          />
          <img
            className="sm:w-10 w-8 bg-green-200 p-2 rounded shadow-lg cursor-pointer"
            src={notification}
            alt="notification"
            onClick={playMarioMushroom}
          />
          <div className="flex items-center gap-1">
            <img
              className="sm:w-10 w-8 bg-red-200 p-2 rounded shadow-lg cursor-pointer"
              src={userImage}
              alt="user"
              onClick={playMarioDeath}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
