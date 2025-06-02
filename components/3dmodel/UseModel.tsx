'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  Center,
  Environment,
  Float,
} from '@react-three/drei'
import { useInView } from 'framer-motion'
import MyModel from './MyModel'

const MyCanvas = () => {
  const { invalidate } = useThree()
  useEffect(() => {
    const interval = setInterval(() => {
      invalidate()
    }, 1000 / 30)
    return () => clearInterval(interval)
  }, [invalidate])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-3, -3, 5]} intensity={0.5} color="#ffe599" />
      <Center>
        <Float
          speed={1}
          floatIntensity={0.1}
          rotationIntensity={0.8}
          floatingRange={[-0.02, 0.02]}
        >
          <MyModel />
        </Float>
      </Center>
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        enablePan={false}
      />
      <Environment preset="sunset" background={false} />
    </>
  )
}

const UseModel = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, margin: '-50px' }) // ตรวจแค่เกือบหลุดจอ

  return (
    <div ref={containerRef} className="w-full h-screen">
      {isInView && (
        <Canvas
          frameloop="demand"
          dpr={[0.5, 1.5]}
        >
          <MyCanvas />
        </Canvas>
      )}
    </div>
  )
}

export default UseModel
