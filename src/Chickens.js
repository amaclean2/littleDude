import React, { useRef } from "react";
import Chicken from "./Chicken";

const Chickens = ({ count = 5 }) => {
  const chickenGroup = useRef();
  const chickens = [];

  for (let i = 0; i < count; i++) {
    chickens.push(
      <Chicken
        key={`chicken_${i}`}
        move={(i % 2 === 0)}
        position={[
          Math.floor(Math.random() * 10) + 12,
          -2.5,
          Math.floor(Math.random() * -10) + 5,
        ]}
        rotation={[0, Math.random() * 10 - 2, 0]}
        direction={!!Math.round(Math.random())}
      />
    );
  }

  return (
    <group ref={chickenGroup} dispose={null}>
      {chickens}
    </group>
  );
};

export default Chickens;
