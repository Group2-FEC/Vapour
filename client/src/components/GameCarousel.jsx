import React, { useState, useEffect } from "react";
import GameCaseComp from "./GameCaseComp";
import { useSpring, animated } from "react-spring";

const GameCarousel = ({ handleShowSale }) => {
  const [time, setTime] = useState(13 * 60 + 15); // 13 hours and 15 minutes in minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => time - 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const fade = useSpring({
    to: { opacity: 1, transform: "scale(1)" },
    from: { opacity: 0, transform: "scale(0.9)" },
    config: { duration: 500 },
  });

  // State for the gradient color
  const [color, setColor] = useState(0);

  // Update the color every second
  useEffect(() => {
    const interval = setInterval(() => {
      setColor((color + 1) % 360);
    }, 1000);
    return () => clearInterval(interval);
  }, [color]);

  return (
    <>
      <div className="relative flex flex-row mx-auto w-5/6 bg-slate-800 p-2">
        <div className="z-10 absolute right-0 top-0 cursor-pointer">
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            onClick={handleShowSale}
          >
            <path
              d="M8.00191 9.41621C7.61138 9.02569 7.61138 8.39252 8.00191 8.002C8.39243 7.61147 9.0256 7.61147 9.41612 8.002L12.0057 10.5916L14.5896 8.00771C14.9801 7.61719 15.6133 7.61719 16.0038 8.00771C16.3943 8.39824 16.3943 9.0314 16.0038 9.42193L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.004C15.6133 16.3945 14.9802 16.3945 14.5896 16.004L12.0057 13.42L9.42192 16.0038C9.03139 16.3943 8.39823 16.3943 8.00771 16.0038C7.61718 15.6133 7.61718 14.9801 8.00771 14.5896L10.5915 12.0058L8.00191 9.41621Z"
              fill="#ffffff"
            />
          </svg>
        </div>
        {/* Place your 3D models here */}
        <GameCaseComp
          cover="src/assets/baldurs_gate.jpg"
          spine="src/assets/baldursgatespine.png"
          back="src/assets/baldursgate.mp4"
        />
        <GameCaseComp
          cover="src/assets/gta4.jpg"
          spine="src/assets/gta4Spine.jpg"
          back="src/assets/gta4.mp4"
        />
        <GameCaseComp
          cover="src/assets/spiderman2.webp"
          spine="src/assets/spidermanspine.png"
          back="src/assets/spiderman.mp4"
        />
        <GameCaseComp
          cover="src/assets/starfield.jpeg"
          spine="src/assets/starfieldspine.png"
          back="src/assets/starfield.mp4"
        />

        {/* Absolute positioned sale and timer divs */}
        <animated.div
          style={fade}
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10 pointer-events-none"
        >
          <animated.div
            style={{
              ...fade,
              transform: fade.transform.to(
                (t) => `scale(${t}) translateX(-50%)`
              ),
            }}
            className=" bg-lime-500 font-extrabold text-white bg-opacity-80 rounded-md text-center sm:text-6xl text-4xl p-2 m-1 shadow-lg pointer-events-auto animate-pulse"
          >
            Holiday Sale
          </animated.div>
          <animated.div
            style={{
              ...fade,
              transform: fade.transform.to(
                (t) => `scale(${t}) translateX(50%)`
              ),
            }}
            className=" bg-red-500 font-bold sm:text-xl text-white bg-opacity-80 rounded-md text-center p-2 m-1 shadow-lg pointer-events-auto animate-pulse"
          >
            Only {String(Math.floor((time % 3600) / 60)).padStart(2, "0")} hrs
            and {String(Math.floor(time % 60)).padStart(2, "0")} mins left!
          </animated.div>
          <animated.button
            style={{
              ...fade,
              backgroundColor: "red",
            }}
            className="text-white sm:text-2xl text-lg font-bold shadow-md rounded-md text-center p-2 m-1 mt-5 transition duration-300 ease-in-out pointer-events-auto animate-bounce"
            onClick={() =>
              window.open("https://github.com/Group2-FEC/Vapour", "_blank")
            }
          >
            Buy Now
          </animated.button>
        </animated.div>
      </div>
    </>
  );
};

export default GameCarousel;
