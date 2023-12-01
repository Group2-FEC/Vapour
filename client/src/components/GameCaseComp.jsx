import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import GameCase from "./models/GameCase";
import { useSpring, a } from "@react-spring/three";

const GameCaseComp = (props) => {
  const gameCover = props.cover;
  const gameSpine = props.spine;
  const gameBack = props.back;
  const [zPos, setZPos] = useState(3.4);
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({ zPos: isHovered ? 3 : 2.4 });

  const handleMouseOver = () => {
    setZPos(4.4);
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setZPos(3.4);
    setIsHovered(false);
  };

  return (
    <>
      <Canvas
        style={{
          margin: "auto",
          width: "50vw",
          height: "50vh",
        }}
        camera={{ near: 0.1, far: 1000 }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />
        <GameCase
          zPos={springProps.zPos}
          position-z={springProps.zPos}
          scale={[10, 10, 10]}
          rotation={[0.1, 0.2, 0.1]}
          cover={gameCover}
          style={springProps}
          spine={gameSpine}
          back={gameBack}
        />
      </Canvas>
    </>
  );
};

export default GameCaseComp;
