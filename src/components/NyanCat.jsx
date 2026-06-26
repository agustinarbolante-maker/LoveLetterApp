import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/NyanCat.css'

const paths = [
  { initial: { left: '-150px', top: '50px' }, animate: { left: '100vw', top: '50px' }, duration: 8 },
  { initial: { right: '-150px', top: '200px' }, animate: { right: '100vw', top: '200px' }, duration: 8, scaleX: -1 },
  { initial: { left: '-150px', top: '350px' }, animate: { left: '100vw', top: '350px' }, duration: 10 },
  { initial: { right: '-150px', top: '500px' }, animate: { right: '100vw', top: '500px' }, duration: 10, scaleX: -1 },
  { initial: { left: '-150px', bottom: '100px' }, animate: { left: '100vw', bottom: '100px' }, duration: 12 },
]

export default function NyanCat() {
  const [cats, setCats] = useState([])
  const [nextId, setNextId] = useState(0)

  useEffect(() => {
    const createCat = () => {
      const path = paths[Math.floor(Math.random() * paths.length)]
      const id = nextId
      setNextId(prev => prev + 1)

      setCats(prev => [...prev, { id, path }])

      const timer = setTimeout(() => {
        setCats(prev => prev.filter(c => c.id !== id))
      }, path.duration * 1000)

      return () => clearTimeout(timer)
    }

    const interval = setInterval(createCat, 3000)
    createCat()

    return () => clearInterval(interval)
  }, [nextId])

  return (
    <div className="nyan-cats-container">
      {cats.map(cat => (
        <motion.div
          key={cat.id}
          className="nyan-cat"
          initial={cat.path.initial}
          animate={cat.path.animate}
          transition={{ duration: cat.path.duration, ease: 'linear' }}
          style={{ scaleX: cat.path.scaleX || 1 }}
        >
          🐱✨
        </motion.div>
      ))}
    </div>
  )
}
