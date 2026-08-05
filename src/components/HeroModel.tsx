import { Billboard, Float, Sparkles, useTexture } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

interface HeroModelProps { textureUrl: string; interactionStrength?: number }

function AvatarPlane({ textureUrl, interactionStrength = 0.32 }: HeroModelProps) {
  const texture = useTexture(textureUrl); const group = useRef<THREE.Group>(null); const pointer = useRef(new THREE.Vector2())
  useFrame(({ pointer: nextPointer }) => { pointer.current.lerp(nextPointer, 0.045); if (group.current) { group.current.rotation.y = pointer.current.x * interactionStrength; group.current.rotation.x = -pointer.current.y * interactionStrength * 0.36; group.current.position.x = pointer.current.x * interactionStrength * 0.6; group.current.position.y = pointer.current.y * interactionStrength * 0.32 } })
  return <Float speed={1.4} rotationIntensity={0.045} floatIntensity={0.2}><group ref={group}><Billboard><mesh position={[0, -0.08, 0]}><planeGeometry args={[4.2, 4.2]} /><meshBasicMaterial map={texture} transparent toneMapped={false} /></mesh></Billboard></group></Float>
}

export function HeroModel({ textureUrl, interactionStrength }: HeroModelProps) {
  return <div className="hero-model" aria-label="Clay portrait rendered in Three.js"><Canvas camera={{ position: [0, 0, 6.6], fov: 37 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}><ambientLight intensity={1.4} /><AvatarPlane textureUrl={textureUrl} interactionStrength={interactionStrength} /><Sparkles count={18} scale={[6, 5, 2]} size={2.4} speed={0.18} color="#f3ffe9" /></Canvas></div>
}
