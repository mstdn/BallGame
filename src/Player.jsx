import * as THREE from 'three'
import { RigidBody, useRapier } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import useGame from './stores/useGame.jsx'

export default function Player()
{
    /**
     * Player constants
     */
    const body = useRef()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const { rapier, world } = useRapier()

    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(10, 10, 10))
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())

    // Get game status from inGame
    const start = useGame((state) => state.start)
    const end = useGame((state) => state.end)
    const restart = useGame((state) => state.restart)
    // Get total blocks count
    const blocksCount = useGame((state) => state.blocksCount)


    // Jumping
    const jump = () =>
    {
        // Get current position
        const origin = body.current.translation()
        // Slightly below the player
        origin.y -= 0.31
        const direction = { x: 0, y: - 1, z: 0 }
        // Create rapier ray
        const ray = new rapier.Ray(origin, direction)
        // Cast rapier ray
        const hit = world.castRay(ray, 10, true)

        if(hit.toi < 0.15)
                body.current.applyImpulse( { x: 0, y: 0.5, z: 0 } )
        
    }

    // Reset
    const reset = () =>
    {
        // Reset player to 0, 0, 0 with 0, 0, 0 impulse
        body.current.setTranslation( { x: 0, y: 1, z: 0 } )
        body.current.setLinvel( { x: 0, y: 0, z: 0 } )
        body.current.setAngvel( { x: 0, y: 0, z: 0 } )
    }

    useEffect(() =>
    {
        const unsubscribeReset = useGame.subscribe(
            (state) => state.phase,
            (value) => 
            {
                if(value === 'ready')
                    reset()
            }
        )

        const unsubscribeJump =  subscribeKeys(
            (state) => state.jump,
            (value) => 
            {
                if(value)
                {
                    jump()
                }
            }
        )

        const unsubscribeAny = subscribeKeys(
            () => 
            {
                start()
            })

        // When destroyed unsubscribe from keys
        return () => 
        {
            unsubscribeReset()
            unsubscribeJump()
            unsubscribeAny()
        }
    }, [])

    
    useFrame((state, delta) =>
    {
        /**
         * Controls for the player
         */
        const { forward, backward, leftward, rightward } = getKeys()

        // Apply forces
        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        // Apply forces per key
        if(forward)
        {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }
        if(backward)
        {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }
        if(leftward)
        {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }
        if(rightward)
        {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }
        // Apply impulses and torque impulses to player
        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)


        /**
         * Camera
         */
        // Get player position
        const bodyPosition = body.current.translation()
        const cameraPosition = new THREE.Vector3()
        // Copy body position
        cameraPosition.copy(bodyPosition)
        // Set proper distance from player
        cameraPosition.z += 2.25
        cameraPosition.y += 0.65

        // Camera target
        const cameraTarget = new THREE.Vector3()
        // Camera target copy body and add a little offset
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25

        // Smooth camera position
        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        // Update camera
        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)


        /**
         * Phases
         */
        // Check if player is at end
        if(bodyPosition.z < - (blocksCount * 4 + 2))
        {
            end()
        }
        // Check if player falls off the map
        if(bodyPosition.y < - 4)
        {
            restart()
        }

    })

    return <>
        {/* Player marble */}
        <RigidBody
            ref={ body }
            position={ [ 0, 1, 0 ] }
            colliders="ball"
            restitution={ 0.2 }
            friction={ 1 }
            canSleep={ false }
            linearDamping={ 0.5 }
            angularDamping={ 0.5 }
        >
            <mesh
                castShadow
            >
                <icosahedronGeometry args={ [ 0.3, 1 ] } />
                <meshStandardMaterial 
                    color="mediumpurple"
                    flatShading
                />
            </mesh>
        </RigidBody>
    </>
}