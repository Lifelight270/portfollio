'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

const CursorTrail: React.FC = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const dotSprings = Array.from({ length: 8 }).map(() => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    return {
      x: useSpring(x, { stiffness: 500, damping: 40 }),
      y: useSpring(y, { stiffness: 500, damping: 40 }),
      set: (vx: number, vy: number) => {
        x.set(vx)
        y.set(vy)
      },
    }
  })

  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', moveHandler)
    return () => window.removeEventListener('mousemove', moveHandler)
  }, [mouseX, mouseY])

  useEffect(() => {
    const unsubX = mouseX.on('change', (val) => {
      dotSprings[0].set(val, dotSprings[0].y.get())
    })
    const unsubY = mouseY.on('change', (val) => {
      dotSprings[0].set(dotSprings[0].x.get(), val)
    })

    const interval = setInterval(() => {
      for (let i = 1; i < dotSprings.length; i++) {
        const prev = dotSprings[i - 1]
        dotSprings[i].set(prev.x.get(), prev.y.get())
      }
    }, 16)

    return () => {
      unsubX()
      unsubY()
      clearInterval(interval)
    }
  }, [mouseX, mouseY, dotSprings])

  return (
    <>
      {dotSprings.map((dot, i) => (
        <motion.div
          key={i}
          style={{
            width: 12 - i * 0.8,
            height: 12 - i * 0.8,
            backgroundColor: `hsl(${200 + i * 10}, 100%, 60%)`,
            borderRadius: '50%',
            position: 'fixed',
            top: 0,
            left: 0,
            translateX: dot.x,
            translateY: dot.y,
            pointerEvents: 'none',
            zIndex: 9999 - i,
            opacity: 1 - i * 0.1,
          }}
        />
      ))}
    </>
  )
}

export default CursorTrail
