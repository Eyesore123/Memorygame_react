import { useEffect, useState, useRef } from 'react'
import Fireworks from 'fireworks-js'
import React from 'react'

export default function VictoryModal({ turns, onSave, onNewGame }) {
  const [name, setName] = useState('')
  const [saveClicked, setSaveClicked] = useState(false)
  const containerRef = useRef(null)
  const fireworksRef = useRef(null)
  const [count, setCount] = useState(0)

  // Function to control fireworks intensity
  const startFireworks = () => {
    if (fireworksRef.current) {
      fireworksRef.current.updateOptions({ intensity: 30 }) // High intensity for restart effect
      fireworksRef.current.start()
    }
  }

  const stopFireworks = () => {
    if (fireworksRef.current) {
      fireworksRef.current.updateOptions({ intensity: 0 }) // Stop by reducing intensity to 0
    }
  }

  useEffect(() => {
    if (containerRef.current && !fireworksRef.current) {
      // Initialize fireworks only once
      fireworksRef.current = new Fireworks(containerRef.current, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.02,
        friction: 0.97,
        gravity: 1.5,
        particles: 300,
        traceLength: 3,
        traceSpeed: 2,
        explosion: 5,
        intensity: 60, // Initial intensity
        flickering: 50,
        lineStyle: 'round',
        hue: { min: 0, max: 360 },
        delay: { min: 30, max: 60 },
        rocketsPoint: { min: 0, max: 50 },
        lineWidth: { explosion: { min: 2, max: 4 }, trace: { min: 0.2, max: 1 } },
        brightness: { min: 50, max: 80 },
        decay: { min: 0.015, max: 0.1 },
        mouse: { click: false, move: false, max: 1 }
      })
      fireworksRef.current.start() // Start fireworks on load
    }

    const animateFireworks = () => {
      setCount(c => c + 1)
      stopFireworks() // Stop briefly
      setTimeout(startFireworks, 1000) // Restart after 1 second
    }

    // Use requestAnimationFrame for smoother control
    let animationFrameId = requestAnimationFrame(animateFireworks)
    
    return () => {
      cancelAnimationFrame(animationFrameId)
      fireworksRef.current?.stop() // Stop fireworks on unmount
    }
  }, [])

  const handleSave = () => {
    onSave(name, turns)
    setSaveClicked(true)
  }

  return (
    <div className='fireworks-container' ref={containerRef}>
      <div className='victory-modal'>
        <h2>Congratulations, you won in {turns} turns!</h2>
        <input
          type='text'
          placeholder='Enter your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {!saveClicked && <button className='finalbutton' onClick={handleSave}>Save score</button>}
        {saveClicked && 
        <>
        <p className='text'>Your score has been saved!</p>
        <button className='finalbutton' onClick={onNewGame}>New Game</button>
        </>
        }
      </div>
    </div>
  )
}
