import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Level } from './Level.jsx'
import Lights from './Lights.jsx'
import Player from './Player.jsx'  

export default function Experience()
{
    return <>
        <Suspense fallback={ null }>
            <OrbitControls makeDefault />
            <Physics
                debug={ false }
            >
                <Lights />
                <Level />
                <Player />
            </Physics>
        </Suspense>
    </>
}