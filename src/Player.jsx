import { RigidBody, useRapier } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useRef, useEffect } from 'react'

export default function Player()
{
    const body = useRef()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const { rapier, world } = useRapier()

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

    useEffect(() =>
    {
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
        // When destroyed unsubscribe from keys
        return () => 
        {
            unsubscribeJump()
        }
    }, [])

    useFrame((state, delta) =>
    {
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

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)
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