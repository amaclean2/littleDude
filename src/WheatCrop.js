import React, { useRef } from 'react';
import Wheat from './WheatPlant';

const WheatCrop = ({...props}) => {
    const wheatRef = useRef();
    
    const createWheatRow = (position, offset = false) => (
        <group position={position}>
            <Wheat position={[0, 0, 0.5 + (offset ? 0.25 : 0)]} />
            <Wheat position={[0, 0, 1 + (offset ? 0.25 : 0)]} />
            <Wheat position={[0, 0, 1.5 + (offset ? 0.25 : 0)]} />
            <Wheat position={[0, 0, 2 + (offset ? 0.25 : 0)]} />
        </group>
    )
    return (
        <group ref={wheatRef} {...props}>
            { createWheatRow([0.5, 0, 0]) }
            { createWheatRow([1, 0, 0], true) }
            { createWheatRow([1.5, 0, 0]) }
            { createWheatRow([2, 0, 0], true) }
        </group>
    );
};

export default WheatCrop;