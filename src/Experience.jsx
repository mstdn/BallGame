import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'
import { Level } from './Level.jsx'
import Lights from './Lights.jsx'
import Player from './Player.jsx'
import useGame from './stores/useGame.jsx'

export default function Experience()
{
    const blocksCount = useGame(state => state.blocksCount)
    const blocksSeed = useGame(state => state.blocksSeed)

    return <>
        <Suspense fallback={ null }>
            <Physics
                debug={ false }
            >
                <Lights />
                <Level count={ blocksCount } seed={ blocksSeed } />
                <Player />
            </Physics>
        </Suspense>
    </>
}