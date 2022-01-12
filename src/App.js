import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css';
import Chickens from './Chickens';
import ControllerInput from './ControllerInput';
import Ground from './Ground';

import { KeyProvider } from './KeyContext';
import { ChickenProvider } from './ChickenContext';

import { LittleDude } from './LittleDude';
import Tree from './Tree';
import Chicken from './Chicken';

const App = () => {

  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <KeyProvider>
            <ChickenProvider>
              <ControllerInput />
              <fog attach="fog" args={["white", 100, 200]} />
              <LittleDude />
              <Chicken />
              {/* <Tree position={[-10, 24, -10]}/>
              <Tree position={[12, 14.5, 25]} scale={[6, 6, 6]} rotation={[-3.13, 10, 3.08]} /> */}
              <Ground />
              <OrbitControls />
              <Environment preset={"dawn"} background />
            </ChickenProvider>
          </KeyProvider>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
