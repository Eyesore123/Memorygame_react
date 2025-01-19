import { useEffect, useState } from 'react'

import React from 'react'

export default function Leaderboard() {

  const scores = JSON.parse(localStorage.getItem('memoryGameScores')) || []

  const sortedScores = scores.sort((a, b) => a.score - b.score)

  const topScores = sortedScores.slice(0, 5)

  return (
    <div className='leaderboard'>
      <h1 className='topscores'>Top scores</h1>
        <div className="scores-list">
          {topScores.length > 0 ? (
            <ul>
              {topScores.map((score, index) => (
                <li key={index}>
                  {score.name}: {score.score} turns
                </li>
              ))}
            </ul>)
             : (

           <p className='no-scores'>No scores yet. Be the first to play and get your name on the leaderboard! 🏆</p>
            )}
        </div>
    </div>
  )
}
