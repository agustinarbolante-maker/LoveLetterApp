import { motion } from 'framer-motion'
import { useState } from 'react'
import '../styles/LetterDetail.css'

export default function LetterDetail({ letter, onBack }) {
  const [passwordInput, setPasswordInput] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(!letter.password)

  const handlePasswordSubmit = () => {
    if (passwordInput === letter.password) {
      setIsUnlocked(true)
      setPasswordInput('')
    } else {
      alert('Wrong password!')
    }
  }

  return (
    <motion.div
      className="letter-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mail-reader">
        <div className="mail-toolbar">
          <button onClick={onBack} className="back-btn">← Back to Inbox</button>
          <div className="mail-actions">
            <span className="mail-date">{new Date(letter.timestamp).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mail-header">
          <div className="mail-from">
            <span className="label">Title:</span>
            <span className="value">{letter.author}</span>
          </div>
          <div className="mail-date-full">
            <span className="label">Date:</span>
            <span className="value">{new Date(letter.timestamp).toLocaleString()}</span>
          </div>
        </div>

        <div className="mail-divider"></div>

        <div className="mail-body">
          {!isUnlocked ? (
            <div className="password-locked">
              <p className="lock-message">🔒 This letter is password protected</p>
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handlePasswordSubmit()
                  }
                }}
                className="password-field"
              />
              <button onClick={handlePasswordSubmit} className="unlock-button">
                Unlock 🔑
              </button>
            </div>
          ) : (
            <motion.p
              className="letter-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {letter.content}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
