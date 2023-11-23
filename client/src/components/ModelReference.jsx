// This is a template for how 3d models can be styled. 
// review the style in the 'Canvas' component to see how the Canvas itself is positioned and scaled.
// review the style in the 'Alien' component to see how the model itself is positioned and scaled.


import React from 'react'
import { Canvas } from "@react-three/fiber";
import Alien from "./models/Alien";


const ModelReference = () => {
  return (
    <>  
    <Canvas
        style={{ margin: 'auto', border: '2px solid black', borderRadius: '2px', width: '50vw', height: '50vh' }}
        camera={{ near: 0.1, far: 1000 }}
      >
		<directionalLight position={[1, 1, 1]} intensity={7} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1.0}
          />
	<Alien 
	position={[0, -40, -50]}
	scale={[0.3, 0.3, 0.3]}
/>
	</Canvas>
    </>
  )
}

export default ModelReference