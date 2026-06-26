import { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/InboxSection.css'

export default function InboxSection({ letters, isFromJodi = false, onLetterClick }) {
  const [expanded, setExpanded] = useState(null)
  const [letterTitle, setLetterTitle] = useState('')
  const [letterContent, setLetterContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [unlockClicks, setUnlockClicks] = useState(0)
  const [passwordInputs, setPasswordInputs] = useState({})
  const isUnlocked = unlockClicks >= 5

  const handlePasswordSubmit = (letterId, password) => {
    const letter = myLetters.find(l => l.id === letterId)
    if (letter && letter.password === password) {
      setPasswordInputs({ ...passwordInputs, [letterId]: true })
    } else {
      alert('Wrong password!')
    }
  }

  const handleWriteLetter = async () => {
    if (!letterTitle.trim() || !letterContent.trim()) {
      alert('Please fill in both title and message!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/api/letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: 'From Jodi',
          content: `${letterTitle}\n\n${letterContent}`
        })
      })

      const data = await response.text()
      console.log('Response:', response.status, data)

      if (response.ok) {
        setLetterTitle('')
        setLetterContent('')
        alert('💜 Letter sent! He will see it soon.')
        window.location.reload()
      } else {
        alert(`Error: ${response.status} - ${data}`)
      }
    } catch (error) {
      console.error('Error sending letter:', error)
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (isFromJodi) {
    return (
      <div className="inbox-section">
        <h2>💜 Your Letters</h2>
        <div className="letters-container">
          <div className="letters-list">
            {letters.filter(l => l.author === 'From Jodi').length === 0 ? (
              <div className="empty-state">No letters yet... waiting for yours 💜</div>
            ) : (
              letters.filter(l => l.author === 'From Jodi').map((letter, i) => (
                <motion.div
                  key={letter.id}
                  className={`letter-item ${expanded === letter.id ? 'expanded' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setExpanded(expanded === letter.id ? null : letter.id)}
                  whileHover={{ x: 5 }}
                >
                  <div className="letter-header">
                    <h3>From: Jodi</h3>
                    <span className="date">
                      {new Date(letter.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  {expanded === letter.id && (
                    <motion.p
                      className="letter-content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {letter.content}
                    </motion.p>
                  )}
                </motion.div>
              ))
            )}
          </div>

          <div className="write-letter-form">
            <h3>Feel free to write back!</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Subject..."
                value={letterTitle}
                onChange={(e) => setLetterTitle(e.target.value)}
                className="letter-input"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Write your heart out..."
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                className="letter-textarea"
                rows="10"
              />
            </div>
            <motion.button
              onClick={handleWriteLetter}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="send-letter-btn"
            >
              {loading ? '📤 Sending...' : 'Send Letter 💜'}
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  const myLetters = letters.filter(l => l.author !== 'From Jodi')

  if (!isFromJodi && !isUnlocked) {
    return (
      <div className="inbox-section">
        <h2>💌 My Letters to You</h2>
        <motion.div
          className="locked-inbox"
          onClick={() => setUnlockClicks(unlockClicks + 1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="lock-icon">🔒</div>
          <p className="lock-text">Click to unlock...</p>
          <p className="click-counter">{unlockClicks}/5 clicks</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="inbox-section">
      <h2>💌 My Letters to You</h2>
      <div className="letters-list">
        {myLetters.length === 0 ? (
          <div className="empty-state">No letters yet...</div>
        ) : (
          myLetters.map((letter, i) => (
            <motion.div
              key={letter.id}
              className={`letter-item ${expanded === letter.id ? 'expanded' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onLetterClick ? onLetterClick(letter) : setExpanded(expanded === letter.id ? null : letter.id)}
              whileHover={{ x: 5 }}
            >
              <div className="letter-header">
                <h3>Title: {letter.author}</h3>
                <span className="date">
                  {new Date(letter.timestamp).toLocaleDateString()}
                </span>
              </div>
              {expanded === letter.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {letter.password && !passwordInputs[letter.id] ? (
                    <div className="password-prompt">
                      <p>🔒 This letter is password protected</p>
                      <input
                        type="password"
                        placeholder="Enter password..."
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handlePasswordSubmit(letter.id, e.target.value)
                            e.target.value = ''
                          }
                        }}
                        className="password-input-field"
                      />
                      <button
                        onClick={(e) => {
                          const input = e.target.previousElementSibling
                          handlePasswordSubmit(letter.id, input.value)
                          input.value = ''
                        }}
                        className="unlock-btn"
                      >
                        Unlock 🔑
                      </button>
                    </div>
                  ) : (
                    <motion.p
                      className="letter-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {letter.content}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
