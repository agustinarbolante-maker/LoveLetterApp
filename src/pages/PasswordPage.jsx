import { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/PasswordPage.css'

const CORRECT_PASSWORD = 'Serendipity'

const RIDDLE = `I am not planned, I am not forced.
I arrive uninvited, yet welcomed, of course.
I am the moment you found what you didn't know you'd need.
I am the accident that turned into everything.

What am I?`

export default function PasswordPage({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
      onLogin()
    } else {
      setError('Wrong answer. Think about the riddle...')
      setPassword('')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <motion.div
      className="password-page dark-theme"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="password-container">
        <motion.div
          className="lock-symbol"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          🔐
        </motion.div>

        <motion.div
          className="riddle-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="riddle-text">{RIDDLE}</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.input
            type="text"
            placeholder="Your answer..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="password-input"
          />
          <motion.button
            type="submit"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="submit-btn"
          >
            ENTER
          </motion.button>
        </form>

        {error && (
          <motion.div
            className="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
