import React from "react";
import { DoubleSide } from "three";

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeBufferGeometry args={[1000, 1000]} />
      <meshStandardMaterial color={"#88AA66"} side={DoubleSide} />
    </mesh>
  );
};

export default Ground;
