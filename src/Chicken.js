import { useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import chickenModel from "./models/chicken.gltf";
import { Quaternion, Vector3 } from "three";
import { useWalkState } from "./LittleDude";

const Chicken = (props) => {
  const chickenGroup = useRef();
  const { scene, materials, animations } = useGLTF(chickenModel);
  const chickenClone = useMemo(() => clone(scene), [scene]);
  const { nodes } = useGraph(chickenClone);
  const { actions } = useAnimations(animations, chickenGroup);

  const TURN_SPEED = 0.002;
  const WALK_SPEED = 0.008;

  const quat = new Quaternion();
  const axis = new Vector3(0, 1, 0);
  const velocity = new Vector3(0, 0, WALK_SPEED);

  useFrame((state, delta) => {
	if (props.move) {
		const chickenTurnOffset = (Math.floor(Math.random() * 10) - 5) / 10000;
		const chickenTurn = chickenTurnOffset + TURN_SPEED;
		quat.setFromAxisAngle(axis, Math.PI * chickenTurn * (props.direction ? 1 : -1));
		chickenGroup.current.quaternion.multiply(quat);

		const forward = new Vector3(0, 0, 1);
		forward.applyQuaternion(chickenGroup.current.quaternion);
		forward.normalize();

		const sideways = new Vector3(1, 0, 0);
		sideways.applyQuaternion(chickenGroup.current.quaternion);
		sideways.normalize();

		forward.multiplyScalar(velocity.z);
		sideways.multiplyScalar(velocity.x);

		chickenGroup.current.position.add(forward);
		chickenGroup.current.position.add(sideways);
	}
  });

  useEffect(() => {
	actions[(props.move) ? "Hunt" : "Hop"]?.play();
    return actions[(props.move) ? "Hunt" : "Hop"]?.reset();

  }, []);

  return (
    <group ref={chickenGroup} {...props} dispose={null}>
      <group position={[0, 2.98, 0]} scale={[0.5, 0.5, 0.5]}>
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
