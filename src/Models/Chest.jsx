import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Chest(props) {
  const { nodes, materials } = useGLTF("./assets/models/chest.gltf")
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube051.geometry}
          material={materials["Metal.085"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube051_1.geometry}
          material={materials["BrownDark.053"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube051_2.geometry}
          material={materials["Gold.006"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube051_3.geometry}
          material={materials["Red.039"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./assets/models/chest.gltf")