import { useRef, useEffect } from 'react'
import { useKeyboardControls } from '@react-three/drei'
import { addEffect } from '@react-three/fiber'
import useGame from './stores/useGame.jsx'

export default function Interface()
{
    const time = useRef()
    
    // Get function to restart the game from the store
    const restart = useGame((state) => state.restart)
    // Get the current phase from the store
    const phase = useGame((state) => state.phase)

    // Get true / false values for the keyboard controls
    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const jump = useKeyboardControls((state) => state.jump)

    useEffect(() =>
    {
        const unsubscribeEffect = addEffect(() =>
        {
            // Get states from the store
            const state = useGame.getState()

            // Create empty time
            let elapsedTime = 0
            
            // Calc the time
            if(state.phase === 'playing')
                elapsedTime = Date.now() - state.startTime
            else if(state.phase === 'ended')
                elapsedTime = state.endTime - state.startTime
            
            elapsedTime = elapsedTime / 1000
            elapsedTime = elapsedTime.toFixed(2)
            
            if(time.current)
                time.current.textContent = elapsedTime
        })

        return () => { unsubscribeEffect() } 
    }, [  ])

    return <>
        <div className="interface">

            {/* Time */}
            <div 
                ref={ time  }
                className="time"
            >
                0.00
            </div>

            {/* Restart, only displayed when the game "ended" */}
            { phase === 'ended' &&
                <div 
                    className="restart"
                    onClick={ restart }
                >
                    Restart
                </div>
            }

            {/* Controls */}
            <div className="controls">
                <div className="raw">
                    <div className={ `key ${ forward ? 'active' : '' }` }></div>
                </div>
                <div className="raw">
                    <div className={ `key ${ leftward ? 'active' : '' }` }></div>
                    <div className={ `key ${ backward ? 'active' : '' } ` }></div>
                    <div className={ `key ${ rightward ? 'active' : '' } ` }></div>
                </div>
                <div className="raw">
                    <div className={ `key large ${ jump ? 'active' : '' } ` }></div>
                </div>
            </div>

        </div>
    </>
}