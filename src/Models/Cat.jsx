import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei'

export default function Cat() {
  const cat = useLoader(GLTFLoader, './assets/models/cat/scene.gltf')
  cat.scene.children.forEach((mesh) =>
    {
        mesh.castShadow = true
        mesh.receiveShadow = true
    })
    console.log(cat)
  
  return <>
    <primitive
      object={ cat.scene }
      scale={ 4 }
      position={ [ 1.3, 0, 0 ] }
      rotation-y={ Math.PI * 0.3 }
      castShadow
      receiveShadow
    />
  </>
}

useGLTF.preload('./assets/models/cat/scene.gltf')