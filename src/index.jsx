import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { KeyboardControls, Loader } from '@react-three/drei'
import { StrictMode } from 'react'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(<>
    <Loader 
        dataInterpolation={ (p) => `Meow ${p.toFixed(0)}%` }
        barStyles={{ 
            backgroundColor: 'black',
            height: '20px' 
        }}
        innerStyles={{
            backgroundColor: 'white',
            height: '20px'
        }}
        containerStyles={{
            backgroundColor: '#d6b138',
            padding: '20px' 
        }}
        dataStyles={{
            color: 'white', 
            fontSize: '16px'
        }}
    />
    <KeyboardControls 
            map={ [
                { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
                { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
                { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
                { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
                { name: 'jump', keys: [ 'Space' ] }
            ] }
        >
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 2.5, 4, 6 ]
            } }
        >
            <Experience />
        </Canvas>
    </KeyboardControls>
</>
    
)