// the models folder will be where I contain all of the 3d model components. 
// the 'public/assets' dir is where the .glb files containing the actual 3d model itself will be stored.
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { a } from "@react-spring/three";

const Alien = (props) => {
  const alienRef = useRef();
  const { nodes, materials } = useGLTF("/assets/xeno_raven.glb");
  
  useFrame(() => {
    if (alienRef.current) {
      alienRef.current.rotation.y += 0.01;
    }
  });


  return (
    <>
      <a.group ref={alienRef} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["body_07_-_Default_0"].geometry}
          material={materials["07_-_Default"]}
          position={[0, -6.43225193, -2.8e-7]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.head_default_0.geometry}
          material={materials["default"]}
          position={[0, -6.43225193, -2.8e-7]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </a.group>
    </>
  );
};

export default Alien;
