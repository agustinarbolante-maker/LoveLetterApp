import { motion } from 'framer-motion'
import '../styles/MusicSection.css'

export default function MusicSection({ songs }) {
  return (
    <div className="music-section">
      <h2>🎵 Songs That Make Me Think of You</h2>
      <div className="songs-list">
        {songs.length === 0 ? (
          <div className="empty-state">No songs yet...</div>
        ) : (
          songs.map((song, i) => (
            <motion.div
              key={song.id}
              className="song-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="song-info">
                <h3>{song.title}</h3>
                <p className="artist">by {song.artist}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
