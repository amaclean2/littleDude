import React, { useRef } from "react";
import Chicken from "./Chicken";

const Chickens = ({ count = 5 }) => {
  const chickenGroup = useRef();
  const chickens = [];

  for (let i = 0; i < count; i++) {
    chickens.push(
      <Chicken
        key={`chicken_${i}`}
        position={[
          Math.floor(Math.random() * (Math.round(Math.random()) ? 25 : -25)),
          -2.5,
          Math.floor(Math.random() * (Math.round(Math.random()) ? 25 : -25))
        ]}
      />
    )
  }

  return (
    <group ref={chickenGroup} dispose={null}>
      {chickens}
    </group>
  )
}

export default Chickens;