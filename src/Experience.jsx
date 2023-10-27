import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'
import { Level } from './Level.jsx'
import Lights from './Lights.jsx'
import Player from './Player.jsx'  

export default function Experience()
{
    return <>
        <Suspense fallback={ null }>
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