import Lights from './Lights.jsx'
import { Level } from './Level.jsx'
import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'
import { 
    OrbitControls,
    Html,
    useProgress
} from '@react-three/drei'


function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress}%</Html>
  }
  

export default function Experience()
{
    return <>
        <Suspense fallback={ <Loader /> }>
            <OrbitControls makeDefault />

            <Physics debug>
                <Lights />
                <Level />
            </Physics>
        </Suspense>
    </>
}