import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import GiftPage from './pages/GiftPage'
import PasswordPage from './pages/PasswordPage'
import YouveGotMailPopup from './components/YouveGotMailPopup'
import HomePage from './pages/HomePage'
import './App.css'

export default function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [showGift, setShowGift] = useState(false)
  const [showMailPopup, setShowMailPopup] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('authenticated') === 'true'
    setAuthenticated(auth)
  }, [])

  const handleLogin = () => {
    setShowGift(true)
  }

  const handleGiftOpen = () => {
    setShowGift(false)
    localStorage.setItem('authenticated', 'true')
    setAuthenticated(true)
    setShowMailPopup(true)
  }

  const handleReadMail = () => {
    setShowMailPopup(false)
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {!authenticated ? (
          showGift ? (
            <GiftPage key="gift" onGiftOpen={handleGiftOpen} />
          ) : (
            <PasswordPage key="password" onLogin={handleLogin} />
          )
        ) : (
          <HomePage key="home" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showMailPopup && (
          <YouveGotMailPopup key="mail" onRead={handleReadMail} />
        )}
      </AnimatePresence>
    </div>
  )
}
