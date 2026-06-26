import { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/GiftPage.css'

const FLOWERS = ['🌹', '🌸', '🌺', '🌻', '🌷', '💐', '🥀']

function FloatingFlower({ delay, duration }) {
  const randomFlower = FLOWERS[Math.floor(Math.random() * FLOWERS.length)]
  const randomX = Math.random() * 100
  const randomSize = Math.random() * 40 + 20

  return (
    <motion.div
      className="floating-flower"
      style={{
        fontSize: randomSize,
        left: `${randomX}%`,
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: window.innerHeight + 100, opacity: [0, 1, 1, 0] }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'linear',
      }}
    >
      {randomFlower}
    </motion.div>
  )
}

export default function GiftPage({ onGiftOpen }) {
  const [showFlowers, setShowFlowers] = useState(false)
  const [showMusicPopup, setShowMusicPopup] = useState(false)

  const handleGiftClick = () => {
    setShowFlowers(true)
    setTimeout(() => {
      setShowMusicPopup(true)
    }, 4000)
  }

  const handleMusicOk = () => {
    setShowMusicPopup(false)
    setShowFlowers(false)
    onGiftOpen()
  }

  return (
    <div className="gift-page">
      <div className="gift-container">
        <motion.button
          className="gift-button"
          onClick={handleGiftClick}
          disabled={showFlowers}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="gift-icon">🎁</span>
          <span className="gift-text">Press for your gift</span>
        </motion.button>

        <motion.p
          className="gift-caption"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I know you dont want me spending on you so heres digital flowers! 💐
        </motion.p>
      </div>

      {showFlowers && (
        <div className="flowers-container">
          {[...Array(15)].map((_, i) => (
            <FloatingFlower
              key={i}
              delay={i * 0.2}
              duration={4 + Math.random() * 2}
            />
          ))}
        </div>
      )}

      {showMusicPopup && (
        <motion.div
          className="music-popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="music-popup"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <h2>🎵 Music Time!</h2>
            <p>Before you proceed, pls play smth on the background!</p>
            <p className="music-hint">(our blend is okay too!)</p>
            <motion.button
              onClick={handleMusicOk}
              className="ok-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              I'll play some music now 🎶
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
