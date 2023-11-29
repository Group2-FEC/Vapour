// This is a template for how 3d models can be styled.
// review the style in the 'Canvas' component to see how the Canvas itself is positioned and scaled.
// review the style in the 'Alien' component to see how the model itself is positioned and scaled.

import React from "react";
import { Canvas } from "@react-three/fiber";
import GameCase from "./models/GameCase";

const GameCaseComp = (props) => {
  const gameCover = props.cover;
  return (
    <>
      <Canvas
        style={{
          margin: "auto",

          width: "50vw",
          height: "50vh",
        }}
        camera={{ near: 0.1, far: 1000 }}
      >
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />

        <GameCase
          position={[0, -1, 3.4]}
          scale={[10, 10, 10]}
          rotation={[0.1, 0.2, 0.1]}
          cover={gameCover}
        />
      </Canvas>
    </>
  );
};

export default GameCaseComp;
