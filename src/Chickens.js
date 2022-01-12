import React, { createRef, useEffect, useRef, useState } from "react";
import { Skeleton } from "three";
import Chicken from "./Chicken";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import { useAnimations, useGLTF } from "@react-three/drei";

const Chickens = ({ count = 1 }) => {
  // const [newChicken, setNewChicken] = useState(null);
  // const [newChickenRef, setNewChickenRef] = useState(null);

  // const chickenRef = useRef();

  // const chicken = <Chicken initPos={[3, 2]} ref={chickenRef} />

  // useEffect(() => {
  //     if (chickenRef.current) {
  //         setNewChickenRef(createRef(clone(chickenRef.current)));
  //         setNewChicken(<Chicken ref={newChickenRef} />)
  //     }
  // }, [chickenRef])

  // useEffect(() => {

  // }, [newChickenRef])

  // return (
  //     <>
  //         {chicken}
  //         {newChicken}
  //     </>
  // );
  const { nodes, materials } = useGLTF("/chicken.gltf");

  const [chickenRefs, setChickenRefs] = useState([]);

  useEffect(() => {
    setChickenRefs((chickenRefs) =>
      Array(count)
        .fill()
        .map((_, idx) => chickenRefs[idx] || createRef())
    );
  }, []);

  const chickensComponent = (
    <>
      <group
        ref={chickenRefs[0]}
        position={[-4, 5]}
        dispose={null}
      >
        <group position={[0, 0.5, 0]} scale={[0.5, 0.5, 0.5]}>
          <primitive object={nodes.Body} />
          <primitive object={nodes.Bottom} />
          <primitive object={nodes.LegIKL} />
          <primitive object={nodes.LegPullTargetL} />
          <primitive object={nodes.LegIKR} />
          <primitive object={nodes.LegPullTargetR} />
          <skinnedMesh
            geometry={nodes.Plane.geometry}
            material={materials["Material.002"]}
            skeleton={nodes.Plane.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Plane_1.geometry}
            material={materials["Material.003"]}
            skeleton={nodes.Plane_1.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Plane_2.geometry}
            material={materials["Material.004"]}
            skeleton={nodes.Plane_2.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Plane_3.geometry}
            material={materials["Material.005"]}
            skeleton={nodes.Plane_3.skeleton}
          />
        </group>
      </group>
    </>
  );

  return <>{chickenRefs.length && chickensComponent}</>;
};

export default Chickens;
