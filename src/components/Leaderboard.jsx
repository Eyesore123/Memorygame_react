import { useEffect, useState } from 'react'

import React from 'react'

export default function Leaderboard() {

  const [scores, setScores] = useState(() => {
    return JSON.parse(localStorage.getItem('memoryGameScores')) || []
  })

  return (
    <div className='leaderboard'>
      <h2 className='topscores'>Top scores</h2>
      <div className="scores-list">
        {scores.sort((a, b) => a.turns -b.turns).slice(0.5).map((score, index) => (
          <div key={index} className="score-item">
          <span>#{index + 1}</span>
            <span>{score.name}</span>
            <span>{score.turns} turns</span>
          </div>
        ))}

        {scores.length === 0 && <p className='no-scores'>No scores yet. Be the first to play and get your name on the leaderboard! 🏆</p>}
        
      </div>
    </div>
  )
}
