import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Chest } from './Models/Chest.jsx'
import { 
    RigidBody,
    CuboidCollider
} from '@react-three/rapier'
import { 
    useRef,
    useState,
    useMemo
} from 'react'
import { Float, Text } from '@react-three/drei'

/**
 * 
 *  Geometries and materials 
 * 
 * */

// Floor geometry
const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 )
// Materials
const floorMaterial = new THREE.MeshStandardMaterial( { color: 'limegreen' } )
const otherFloorMaterial = new THREE.MeshStandardMaterial( { color: 'greenyellow' } )
const obstacleMaterial = new THREE.MeshStandardMaterial( { color: 'orangered' } )
const wallMaterial = new THREE.MeshStandardMaterial( { color: 'slategrey' } )

/**
 * 
 *  Start block
 * 
 * */  
export function BlockStart({ position = [ 0, 0, 0 ] })
{
    return <>
        {/* Floor */}
        <group position={ position }>
            <Float floatIntensity={ 0.25 } rotationIntensity={ 0.25 }>
                <Text
                    font="./assets/fonts/bebas-neue-v9-latin-regular.woff"
                    scale={ 0.5 }
                    maxWidth={ 0.25 }
                    lineHeight={ 0.75 }
                    textAlign="right"
                    position={ [ 0.75, 0.65, 0 ] }
                    rotation-y={ - 0.25 }
                >
                    meow
                    <meshBasicMaterial toneMapped={ false } />
                </Text>
            </Float>
            <mesh
                geometry={ boxGeometry }
                material={ floorMaterial }
                scale={ [ 4, 0.2, 4 ] }
                position={ [ 0, - 0.1, 0 ] }
                receiveShadow
            />
        </group>    
    </>
}

/**
 * 
 *  End block
 * 
 * */  
export function BlockEnd({ position = [ 0, 0, 0 ] })
{
    return <>
        {/* Floor */}
        <group position={ position }>
            <Text
                font="./assets/fonts/bebas-neue-v9-latin-regular.woff"
                scale={ 1 }
                position={ [ 0, 2.25, 2 ] }
            >
                FINISH
                <meshBasicMaterial toneMapped={ false } />
            </Text>
            <mesh
                geometry={ boxGeometry }
                material={ floorMaterial }
                scale={ [ 4, 0.2, 4 ] }
                position={ [ 0, - 0.1, 0 ] }
                receiveShadow
            />

            <RigidBody
                type="fixed"
                colliders="hull"
                restitution={ 0.2 }
                friction={ 0 }
                position={ [ 0, 0, 0 ] }
                rotation={ [ 0, 0, 0 ] }
            >
                <Chest />
            </RigidBody>

        </group>    
    </>
}

/**
 * 
 *  First trap 
 * 
 * */  
export function BlockSpinner({ position = [ 0, 0, 0 ] })
{
    // Obstacle ref
    const obstacle = useRef()

    // Custom value for random
    const [ speed ] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? - 1 : 1))

    // Animate obstacle
    useFrame( (state) =>
    {
        // Get time
        const time = state.clock.getElapsedTime()

        // Rotate obstacle
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler( new THREE.Euler( 0, time * speed, 0 ) )
        obstacle.current.setNextKinematicRotation(rotation)
    })

    return <>
        <group position={ position }>
            {/* Floor */}
            <mesh
                geometry={ boxGeometry }
                material={ otherFloorMaterial }
                scale={ [ 4, 0.2, 4 ] }
                position={ [ 0, - 0.1, 0 ] }
                receiveShadow
            />

            {/* Obstacle */}
            <RigidBody
                ref={ obstacle }
                type="kinematicPosition"
                position={ [ 0, 0.3, 0 ] }
                restitution={ 0.2 }
                friction={ 0 }
            >
                <mesh 
                    geometry={ boxGeometry }
                    material={ obstacleMaterial }
                    scale={ [ 3.5, 0.3, 0.3 ] } 
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>    
    </>
}

/**
 * 
 *  Second trap 
 * 
 * */  
export function BlockLimbo({ position = [ 0, 0, 0 ] })
{
    // Obstacle ref
    const obstacle = useRef()

    // Custom value for random
    const [ timeOffset ] = useState(() => (Math.random() * Math.PI * 2))

    // Animate obstacle
    useFrame( (state) =>
    {
        // Get time
        const time = state.clock.getElapsedTime()

        // Limbo obstacle
        const y = Math.sin(time + timeOffset) + 1.15
        obstacle.current.setNextKinematicTranslation(
            { 
                x: position[0], 
                y: position[1] + y, 
                z: position[2]
            })
    })

    return <>
        <group position={ position }>
            {/* Floor */}
            <mesh
                geometry={ boxGeometry }
                material={ otherFloorMaterial }
                scale={ [ 4, 0.2, 4 ] }
                position={ [ 0, - 0.1, 0 ] }
                receiveShadow
            />

            {/* Obstacle */}
            <RigidBody
                ref={ obstacle }
                type="kinematicPosition"
                position={ [ 0, 0.3, 0 ] }
                restitution={ 0.2 }
                friction={ 0 }
            >
                <mesh 
                    geometry={ boxGeometry }
                    material={ obstacleMaterial }
                    scale={ [ 3.5, 0.3, 0.3 ] } 
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>    
    </>
}

/**
 * 
 *  Third trap 
 * 
 * */  
export function BlockAxe({ position = [ 0, 0, 0 ] })
{
    // Obstacle ref
    const obstacle = useRef()

    // Custom value for random
    const [ timeOffset ] = useState(() => (Math.random() * Math.PI * 2))

    // Animate obstacle
    useFrame( (state) =>
    {
        // Get time
        const time = state.clock.getElapsedTime()

        // Limbo obstacle
        const x = Math.sin(time + timeOffset) * 1.25
        obstacle.current.setNextKinematicTranslation(
            { 
                x: position[0] + x, 
                y: position[1] + 0.75,
                z: position[2]
            })
    })

    return <>
        <group position={ position }>
            {/* Floor */}
            <mesh
                geometry={ boxGeometry }
                material={ otherFloorMaterial }
                scale={ [ 4, 0.2, 4 ] }
                position={ [ 0, - 0.1, 0 ] }
                receiveShadow
            />

            {/* Obstacle */}
            <RigidBody
                ref={ obstacle }
                type="kinematicPosition"
                position={ [ 0, 0.3, 0 ] }
                restitution={ 0.2 }
                friction={ 0 }
            >
                <mesh 
                    geometry={ boxGeometry }
                    material={ obstacleMaterial }
                    scale={ [ 1.5, 1.5, 0.3 ] } 
                    castShadow
                    receiveShadow
                />
            </RigidBody>
        </group>    
    </>
}

/**
 * 
 *  Walls (bounds) 
 * 
 * */ 
function Bounds({ length = 1 })
{
    return <>
        <RigidBody 
            type="fixed"
            restitution={ 0.2 }
            friction={ 0 }
            canSleep={ false }
        >
            {/* Right wall */}
            <mesh
                position={ [ 2.15, 0.75, - (length * 2) + 2 ] }
                geometry={ boxGeometry }
                material={ wallMaterial }
                scale={ [ 0.3, 1.5, 4 * length ] }
                castShadow
            />
            {/* Left wall */}
            <mesh
                position={ [ - 2.15, 0.75, - (length * 2) + 2 ] }
                geometry={ boxGeometry }
                material={ wallMaterial }
                scale={ [ 0.3, 1.5, 4 * length ] }
                receiveShadow
            />
            {/* Back wall */}
            <mesh
                position={ [ 0, 0.75, - (length * 4) + 2 ] }
                geometry={ boxGeometry }
                material={ wallMaterial }
                scale={ [ 4, 1.5, 0.3 ] }
                receiveShadow
            />
            <CuboidCollider
                args={ [ 2, 0.1, 2 * length ] }
                position={ [ 0, - 0.1, - (length * 2) + 2 ] }
                restitution={ 0.2 }
                friction={ 1 }
            />
        </RigidBody>
    </>
}


/**
 * 
 *  The level 
 * 
 * */ 
export function Level({ 
    count = 10,
    types = [ BlockSpinner, BlockLimbo, BlockAxe ],
    seed = 0
})
{
    const blocks = useMemo(() =>
    {
        const blocks = []

        for(let i = 0; i < count; i++)
        {
            const type = types[ Math.floor(Math.random() * types.length) ]
            blocks.push(type)
        }

        return blocks
    }, [ count, types, seed ])

    return <>

        <BlockStart position={ [ 0, 0, 0 ] } />

        { blocks.map((Block, index) => 
            <Block 
            key={ index } 
            position={ [ 0, 0, - (index + 1) * 4 ] } 
            /> 
        ) }

        <BlockEnd position={ [ 0, 0, - (count + 1) * 4 ] } />

        <Bounds length={ count + 2 } />

    </>
}