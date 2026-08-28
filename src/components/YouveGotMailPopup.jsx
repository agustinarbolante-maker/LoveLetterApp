import { useState } from 'react'
import { motion } from 'framer-motion'
import { LETTERS } from '../data/siteData'
import '../styles/YouveGotMailPopup.css'

export default function YouveGotMailPopup({ onRead }) {
  const [scrolled, setScrolled] = useState(false)

  // Get the most recent letter
  const mostRecentLetter = LETTERS.reduce((latest, current) => {
    return new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
  })

  const handleScroll = (e) => {
    const element = e.target
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 50) {
      setScrolled(true)
    }
  }

  return (
    <motion.div
      className="mail-popup-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="mail-popup-letter"
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="mail-icon">💌</div>
        <h2>You've Got Mail!</h2>

        <div className="letter-scroll-container" onScroll={handleScroll}>
          <p className="letter-content">{mostRecentLetter.content}</p>
        </div>

        <p className="scroll-hint">
          {!scrolled ? '📖 Scroll to the end...' : '✨ Ready to continue'}
        </p>

        <motion.button
          onClick={onRead}
          disabled={!scrolled}
          whileHover={scrolled ? { scale: 1.05 } : {}}
          whileTap={scrolled ? { scale: 0.95 } : {}}
          className={`continue-btn ${scrolled ? 'enabled' : 'disabled'}`}
        >
          {scrolled ? 'Continue to Home 💝' : 'Finish Reading...'}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
