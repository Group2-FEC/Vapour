import React from "react";
import GameCaseComp from "./GameCaseComp";

const GameCarousel = () => {
  return (
    <>
      <div className="flex flex-row m-2">
        <GameCaseComp cover="/assets/baldurs_gate.jpg" />
        <GameCaseComp cover="/assets/gta4.jpg" />
        <GameCaseComp cover="/assets/spiderman2.webp" />
        <GameCaseComp cover="/assets/starfield.jpeg" />
      </div>
    </>
  );
};

export default GameCarousel;
