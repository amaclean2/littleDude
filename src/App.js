import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import './App.css';
import Chickens from './Chickens';
import ControllerInput from './ControllerInput';
import Ground from './Ground';

import { KeyProvider } from './KeyContext';
import { ChickenProvider } from './ChickenContext';

import { LittleDude } from './LittleDude';
import Tree from './Tree';
import WheatCrop from './WheatCrop';
import ChickenPen from './ChickenPen';
import WheatPlanter from './WheatPlanter';

const App = () => {
  const gameRef = useRef()

  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <KeyProvider>
            <ChickenProvider>
              <group ref={gameRef}>
                <ControllerInput />
                <fog attach="fog" args={["white", 100, 200]} />
                <LittleDude />
                <Chickens />
                <ChickenPen scale={[3, 3, 3]} position={[10, 0, 5]} />
                <WheatPlanter scale={[3, 3, 3]} position={[-10, 0, 30]}/>
                <Tree position={[-10, 24, -10]}/>
                <Tree position={[50, 24, -50]}/>
                <Tree position={[12, 14.5, 25]} scale={[6, 6, 6]} rotation={[-3.13, 10, 3.08]} />
                <Ground />
                <OrbitControls />
                <Environment preset={"dawn"} background />
              </group>
            </ChickenProvider>
          </KeyProvider>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
