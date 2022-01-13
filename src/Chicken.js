import { useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import chickenModel from "./models/chicken.gltf";
import { Vector3 } from "three";

const Chicken = (props) => {
  const chickenGroup = useRef();
  const { scene, materials, animations } = useGLTF(chickenModel);
  const chickenClone = useMemo(() => clone(scene), [scene]);
  const { nodes } = useGraph(chickenClone);
  const { actions } = useAnimations(animations, chickenGroup);

  useFrame((state, delta) => {
    // chickenGroup.current.translateZ(-0.02);
  });

  useEffect(() => {
    actions.Hunt?.play();
    return actions.Hunt?.reset()
  }, []);

  useEffect(() => {
    const directionInterval = setInterval(
      () =>
        chickenGroup.current.lookAt(
          new Vector3(
            Math.floor(
              Math.random() * (Math.round(Math.random()) ? 2500 : -2500)
            ),
            -2.5,
            Math.floor(
              Math.random() * (Math.round(Math.random()) ? 2500 : -2500)
            )
          )
        ),
      1000 * Math.floor(Math.random() * 120)
    );

    return () => clearInterval(directionInterval);
  }, []);

  return (
    <group ref={chickenGroup} {...props} dispose={null}>
      <group position={[0, 2.95, 0]} scale={[0.5, 0.5, 0.5]}>
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
  );
};

useGLTF.preload(chickenModel);

export default Chicken;
