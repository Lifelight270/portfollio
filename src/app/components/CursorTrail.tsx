'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

// ✅ Custom hook to create a spring-based motion dot
function useCursorDot() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 500, damping: 40 })
  const springY = useSpring(y, { stiffness: 500, damping: 40 })

  const set = (vx: number, vy: number) => {
    x.set(vx)
    y.set(vy)
  }

  return { x: springX, y: springY, set, rawX: x, rawY: y }
}

const CursorTrail: React.FC = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // ✅ Call useCursorDot eight times directly
  const dot0 = useCursorDot()
  const dot1 = useCursorDot()
  const dot2 = useCursorDot()
  const dot3 = useCursorDot()
  const dot4 = useCursorDot()
  const dot5 = useCursorDot()
  const dot6 = useCursorDot()
  const dot7 = useCursorDot()

  const dots = [dot0, dot1, dot2, dot3, dot4, dot5, dot6, dot7]

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
      dot0.set(val, dot0.rawY.get())
    })
    const unsubY = mouseY.on('change', (val) => {
      dot0.set(dot0.rawX.get(), val)
    })

    const interval = setInterval(() => {
      for (let i = 1; i < dots.length; i++) {
        const prev = dots[i - 1]
        dots[i].set(prev.x.get(), prev.y.get())
      }
    }, 16)

    return () => {
      unsubX()
      unsubY()
      clearInterval(interval)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {dots.map((dot, i) => (
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
