import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useRender } from 'react-three-fiber'
import './styles.css'

function Box() {
  let meshRef = useRef(null)
  let rot = [0, 0, 0]
  useRender(() => {
    if (meshRef.current) {
      rot = [rot[0] + 0.05, rot[1] + 0.05, rot[2] + 0.05]
      meshRef.current.rotation.set(...rot)
    }
  })

  const [textures] = useState(() =>
    ['dice1', 'dice2', 'dice3', 'dice4', 'dice5', 'dice6'].map(name =>
      new THREE.TextureLoader().load(`/assets/${name}.png`)
    )
  )

  return (
    <mesh ref={meshRef} position={[0, 0, 5]} castShadow>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      {textures.map(texture => (
        <meshPhongMaterial attachArray="material" key={texture.uuid} map={texture} />
      ))}
    </mesh>
  )
}

function App() {
  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      camera={{ position: [0, 0, 10] }}
      onCreated={({ gl }) => ((gl.shadowMap.enabled = true), (gl.shadowMap.type = THREE.PCFSoftShadowMap))}>
      <ambientLight intensity={0.2} />
      <spotLight intensity={0.8} position={[30, 30, 50]} angle={0.5} penumbra={1} castShadow />
      <Box />
      <mesh receiveShadow>
        <planeGeometry attach="geometry" args={[1000, 1000]} />
        <meshPhongMaterial attach="material" color="#272727" />
      </mesh>
    </Canvas>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
