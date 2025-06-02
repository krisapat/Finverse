import { useGLTF } from '@react-three/drei'
import { useRef, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Group, Vector3 } from 'three'

const MODEL_PATH = '/models/bitcoin.glb'

type GLTFResult = {
  scene: THREE.Group
}

export default function MyModel(props: React.ComponentProps<'group'>) {
  const group = useRef<Group>(null)
  const { scene } = useGLTF(MODEL_PATH) as GLTFResult
  const [scaleArray, setScaleArray] = useState<[number, number, number]>([0.05, 0.05, 0.05])
  const scale = useMemo(() => new Vector3(...scaleArray), [scaleArray])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const size: [number, number, number] = width < 1024 ? [0.04, 0.04, 0.04] : [0.04, 0.04, 0.04]
      setScaleArray(size)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const material = mesh.material as THREE.MeshStandardMaterial
        if (material) {
          material.envMapIntensity = 5
          material.needsUpdate = true
        }
      }
    })
  }, [scene])

  return (
    <group
      ref={group}
      scale={scale}
      position={[0, 1, 0]}
      rotation={[0, 0, 0]}
      {...props}
    >
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
