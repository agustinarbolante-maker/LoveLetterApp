import { motion } from 'framer-motion'
import '../styles/WhySection.css'

const WHY_CONTENT = `I created this for you because you deserved to know how much you mean to me. Sometimes words spoken don't feel like enough, and I wanted to create something special, something you could revisit whenever you needed a reminder of how deeply I care.

This is my way of being vulnerable with you in a way that feels safe. Through these letters, this music, and this little space we share - I'm telling you my truth. You are my person, Jodi. And I'm willing to wait, to be patient, and to show you every single day that I'm here for you.

I hope this brings you as much joy as you bring to my life.`

export default function WhySection() {
  return (
    <motion.div
      className="why-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>💝 Why I Made This</h2>
      <motion.div
        className="why-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {WHY_CONTENT.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </motion.div>
    </motion.div>
  )
}
