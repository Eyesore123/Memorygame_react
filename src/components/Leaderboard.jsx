import { useEffect, useState } from 'react'
import React from 'react'

// For Supabase:

import { supabase } from '../App.jsx'

export default function Leaderboard() {

  // For local storage:

  // const scores = JSON.parse(localStorage.getItem('memoryGameScores')) || []

  // For supabase:

  const [scores, setScores] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchScores = async () => {
    const { data, error } = await supabase
      .from('scores')
      .select('name, score')
      .order('score', { ascending: true })
      .limit(8)

      if (error) {
        console.error('Error fetching scores:', error)
        return []
      } else {
        return data
      }
    }

    useEffect(() => {
      const loadScores = async () => {
        setIsLoading(true)
        const fetchedScores = await fetchScores()
        setScores(fetchedScores)
        setIsLoading(false)
      }

      loadScores()
    }, [])

  const topScores = scores

  return (
    <div className='leaderboard'>
      <h1 className='topscores'>Top scores</h1>
        <div className="scores-list">
        {isLoading ? (
            <p>Loading scores...</p>
          ) : (
          topScores.length > 0 ? (
            <ul>
              {topScores.map((score, index) => (
                <li key={index}>
                  {score.name}: {score.score} turns
                </li>
              ))}
            </ul>
           )  : (

           <p className='no-scores'>No scores yet. Be the first to play and get your name on the leaderboard! 🏆</p>
            )
        )}
        </div>
    </div>
  )
}
