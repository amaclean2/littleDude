import React, { useEffect } from 'react';
import { useKeyContext } from './KeyContext';

const ControllerInput = () => {
    useEffect(() => {
        document.addEventListener("keydown", registerKey);
        document.addEventListener("keyup", registerLift);
    }, []);

    const { keyStateMap, updateKeyStateMap } = useKeyContext();

    const registerKey = (e) => {
        switch (e.keyCode) {
            case 38: // up
                updateKeyStateMap({
                    direction: "forward",
                    value: e.type === 'keydown'
                });
                break;
            case 37: // left
                updateKeyStateMap({
                    direction: "left",
                    value: e.type === 'keydown'
                });
                break;
            case 40: // down
                updateKeyStateMap({
                    direction: "backward",
                    value: e.type === 'keydown'
                });
                break;
            case 39: // right
                updateKeyStateMap({
                    direction: "right",
                    value: e.type === 'keydown'
                });
                break;
            case 32: // SPACE
                updateKeyStateMap({
                    direction: "space",
                    value: e.type === 'keydown'
                });
                break;
            case 16: // SHIFT
                updateKeyStateMap({
                    direction: "shift",
                    value: e.type === 'keydown'
                });
                break;
        }
    };

    const registerLift = (e) => {
        switch (e.keyCode) {
            case 38: // up
                updateKeyStateMap({
                    direction: "forward",
                    value: e.type === 'keydown'
                });
                break;
            case 37: // left
                updateKeyStateMap({
                    direction: "left",
                    value: e.type === 'keydown'
                });
                break;
            case 40: // down
                updateKeyStateMap({
                    direction: "backward",
                    value: e.type === 'keydown'
                });
                break;
            case 39: // right
                updateKeyStateMap({
                    direction: "right",
                    value: e.type === 'keydown'
                });
                break;
            case 32: // SPACE
                updateKeyStateMap({
                    direction: "space",
                    value: e.type === 'keydown'
                });
                break;
            case 16: // SHIFT
                updateKeyStateMap({
                    direction: "shift",
                    value: e.type === 'keydown'
                });
                break;
        }
    };

    return (
        <></>
    );
};

export default ControllerInput;