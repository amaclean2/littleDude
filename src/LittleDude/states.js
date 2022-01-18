import { Quaternion, Vector3 } from "three";

export const useIdleState = (actions) => {

    return {
        output: 3,
        setIdle: (prevState) => {
            if (prevState && prevState !== 'resting') {
                actions.resting.enabled = true;
                actions.resting.crossFadeFrom(actions[prevState], 0.5, true);
                actions.resting.play();
            } else if (!prevState) {
                actions.resting.play();
            }

            return 'resting';
        }
    }
}

export const useWalkState = ({ actions, target}) => {

    const WALK_SPEED = 0.04;
    const TURN_SPEED = 0.01;

    const velocity = new Vector3(0, 0, 0);
    const deceleration = new Vector3(-0.0005, -0.0001, -5.0);

    const quat = new Quaternion();
    const axis = new Vector3(0, 1, 0);

    const frameDecel = (elapsedTime) => {
        const frameDeceleration = new Vector3(
            velocity.x * deceleration.x,
            velocity.y * deceleration.y,
            velocity.z * deceleration.z
        );

        frameDeceleration.multiplyScalar(elapsedTime);
        frameDeceleration.z = Math.sign(frameDeceleration.z) * Math.min(
            Math.abs(frameDeceleration.z),
            Math.abs(velocity.z)
        );

        velocity.add(frameDeceleration);
    }

    const continueMovement = () => {
        const forward = new Vector3(0, 0, 1);
        forward.applyQuaternion(target.quaternion);
        forward.normalize();

        const sideways = new Vector3(1, 0, 0);
        sideways.applyQuaternion(target.quaternion);
        sideways.normalize();

        forward.multiplyScalar(velocity.z);
        sideways.multiplyScalar(velocity.x);

        target.position.add(forward);
        target.position.add(sideways);
    };

    return {
        output: 4,
        setWalk: (prevState) => {
            if (prevState && prevState !== 'walk_blocking') {
                actions.walk_blocking.enabled = true;
                actions.walk_blocking.crossFadeFrom(actions[prevState], 0.5, true);
                actions.walk_blocking.play();
            } else if (!prevState) {
                actions.walk_blocking.play();
            }

            return 'walk_blocking';
        },
        calibrateMovement: ({ elapsedTime }) => {
            frameDecel(elapsedTime);
        },
        makeRun: () => {
            velocity.multiplyScalar(2);
            continueMovement();
        },
        makeMoveForward: () => {
            velocity.z = WALK_SPEED;
            continueMovement();
        },
        makeMoveBackward: () => {
            velocity.z = -WALK_SPEED;
            continueMovement();
        },
        makeTurnLeft: () => {
            quat.setFromAxisAngle(axis, Math.PI * TURN_SPEED);
            target.quaternion.multiply(quat);
            continueMovement();
        },
        makeTurnRight: () => {
            quat.setFromAxisAngle(axis, -Math.PI * TURN_SPEED);
            target.quaternion.multiply(quat);
            continueMovement();
        }
    }

}