import { createRef, useEffect, useRef, useState } from "react";
import { useAnimations } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import chickenModel from "./models/chicken.gltf";

const Chicken = ({ initPos = [-4, 5], count = 3 }) => {
  const { nodes, materials, animations } = useLoader(
    GLTFLoader,
    chickenModel
  );
  const [chickenRefs, setChickenRefs] = useState([]);

  useEffect(() => {
    if (chickenRefs?.length) {
      console.log("BOK BOK", chickenRefs);

      if (chickenRefs?.length >= count) {
        return;
      }

      const newChicken = clone(chickenRefs[0].current);
      const newChickenRef = createRef();
      newChickenRef.current = newChicken;
      console.log("NEW_CHICKEN", newChicken);
      setChickenRefs([...chickenRefs, newChickenRef]);
    } else {
      setChickenRefs([createRef()])
    }
  }, [chickenRefs]);

  const chickenJSX = (chickenRef, idx) => {
    return <group
      ref={chickenRef}
      position={[initPos[0] + idx * 3, 0, initPos[1] + idx * 3]}
      dispose={null}
      key={`chicken_${idx}`}
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
    </group>;
  };

  return <>
    {
      chickenRefs?.map((chickenRef, idx) => chickenJSX(chickenRef, idx))
    }
  </>;
};

export default Chicken;
