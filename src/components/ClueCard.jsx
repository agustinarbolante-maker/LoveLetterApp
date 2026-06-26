import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/ClueCard.css'

const LETTER_CONTENT = `First month we started talking is when I realized that I really did fall in love with you, I could feel it with an instant that you were my person. And if I'm being honest you are the best thing that ever happened to me. Talking to you at that time made me realize how boring I really was, I started to live life to the fullest when I am around you. Being around you made me realize that being vulnerable to somebody isn't that bad. I started trusting you, being comfortable with you, pouring my heart out to you and of course trying my best to understand you. Although yes that time it was pretty rough trying to understand you but it made me realize that you are worth all the trouble. YOU are my person Jodi, you are my calm to the storm, my reason in the chaos, my 11:11, the answer that I was not looking for, my exhale after a long day, the constant variable in a controlled experiment, my safe place in a world full of chaos and of course my six to my seven? I also wanna be honest that I miss you every single time I'm not with you. And I know that might sound a lot for you, but I'm not asking for everything, I'm just letting you know that I just want once in a while. A moment here and there is really enough for me. I understand the reasons why you don't want anything at the moment, and I truly understand it. If you really just want to be friends for now, I can do that. If that's what it takes to still have you in my life, I'll take it. Because having you as a friend is still better than not having you at all. And also I want you to know that I am willing to wait for you Jodi, I really do. I want to wait for you while you work on yourself, achieve your goals and of course finish your studies. I want to wait till you tell me it's enough or till you tell me that you are ready. I'm not going anywhere. I won't leave. I won't give up. And I will be here every single time you need me. You can doubt it. You can try to push me away because you think I'll just leave anyway but that will never be true. I don't care if there is a hundred million reasons to leave, you are the only reason I'll ever need to stay. I'm really not playing any games here, I have no hidden agendas or whatsoever I just mean everything I am saying. There's really no one like you Jodi, you are one of a kind and this may sound cliche or whatever but you complete me in ways I can't really explain. Like no matter how I try to put it right the feeling just keeps slipping beyond my sight. There's something about you that makes everything feel more bright and clear and though I don't understand it too but like what you said somehow I am more myself with you. I love how alive you make things feel like every moment turns more real. The simplest days also became my favorite too just because I'm spending them with you. You bring a warmth I can't explain like sunshine breaking through the rain and somehow just by being you you make the whole world bloom anew. I really do see a future in you Jodi, I see you as someone I would spend the rest of my time with. And whatever you decide, just know that every word I wrote here is real. I don't say things I don't mean. You deserve to know that.`

function scrambleText(text) {
  const chars = text.split('')
  const scrambled = chars.sort(() => Math.random() - 0.5)
  return scrambled.join('').slice(0, 20) + '...'
}

export default function ClueCard({ number, type, password, hint, imageUrl, scrambled, onUnlock }) {
  const [unlocked, setUnlocked] = useState(false)
  const [inputPassword, setInputPassword] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [error, setError] = useState('')

  const handleUnlock = (e) => {
    e.preventDefault()
    if (inputPassword.toLowerCase() === password.toLowerCase()) {
      setUnlocked(true)
      setError('')
      onUnlock()
    } else {
      setError('Wrong password!')
      setTimeout(() => setError(''), 2000)
    }
  }

  return (
    <motion.div
      className="clue-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="clue-number">Clue {number}</div>

      <AnimatePresence>
        {!unlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="locked-content"
          >
            <div className="lock-icon">🔐</div>
            <p>Locked</p>
            {!showInput && (
              <motion.button
                onClick={() => setShowInput(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="unlock-btn"
              >
                Unlock
              </motion.button>
            )}
            {showInput && (
              <form onSubmit={handleUnlock} className="unlock-form">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  autoFocus
                />
                <button type="submit">Unlock</button>
                {hint && <p className="hint">💡 {hint}</p>}
                {error && <p className="error">{error}</p>}
              </form>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="unlocked-content"
          >
            {type === 'photo' && (
              <img src={imageUrl} alt={`Clue ${number}`} />
            )}
            {type === 'letter' && (
              <div className="letter-content">
                <p>{LETTER_CONTENT}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {scrambled && !unlocked && (
        <div className="scrambled-password">
          {scrambleText(password)}
        </div>
      )}
    </motion.div>
  )
}
