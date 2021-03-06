/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import wheatModel from './models/wheatPlant.gltf'

const Wheat = ({ ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF(wheatModel);

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials['Material.004']}
      />
      <mesh
        geometry={nodes.Cylinder001.geometry}
        material={materials['Material.005']}
        rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
      />
    </group>
  );
};

export default Wheat;

useGLTF.preload('/wheatPlant.gltf')
