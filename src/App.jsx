import './App.css'
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'
import Gamestats from './components/Gamestats'
import VictoryModal from './components/VictoryModal'
import Leaderboard from './components/Leaderboard'

const cardImages = [
  { "src": "/img/icons8-baguette-94.png", matched: false },
  { "src": "/img/icons8-banana-94.png", matched: false },
  { "src": "/img/icons8-carrot-94.png", matched: false },
  { "src": "/img/icons8-cherry-94.png", matched: false },
  { "src": "/img/icons8-birthday-cake-94.png", matched: false },
  { "src": "/img/icons8-blueberry-94.png", matched: false },
  { "src": "/img/icons8-cheese-94.png", matched: false },
  { "src": "/img/icons8-eggs-94.png", matched: false },
  { "src": "/img/icons8-cookies-94.png", matched: false },
  { "src": "/img/icons8-fish-food-94.png", matched: false },
  { "src": "/img/icons8-mushroom-94.png", matched: false },
  { "src": "/img/icons8-noodles-94.png", matched: false },
  { "src": "/img/icons8-salami-pizza-94.png", matched: false },
  { "src": "/img/icons8-thanksgiving-94.png", matched: false },
  { "src": "/img/icons8-tomato-94.png", matched: false },
  { "src": "/img/icons8-strawberry-94.png", matched: false },
  { "src": "/img/icons8-nut-94.png", matched: false },
  { "src": "/img/icons8-mcdonald`s-french-fries-94.png", matched: false },
]


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [finalScore, setFinalScore] = useState(0)
  const [domLoaded, setDomLoaded] = useState(false)

  // Check if the DOM is loaded so the grid doesn't render before the images are loaded

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  // Shuffle the cards
  const shuffleCards = () => {
    setIsLoading(true)
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setGameStarted(true)
    setGameWon(false)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Save score function

  const saveScore = (name, score) => {
    const scores = JSON.parse(localStorage.getItem('memoryGameScores')) || []
    scores.push({ name, score: finalScore })
    localStorage.setItem('memoryGameScores', JSON.stringify(scores))
    console.log(scores)

    // Reset the game
    setGameStarted(false)
    setGameWon(false)
  }

  // Handle a choice and check if all the cards are matched

  const handleChoice = (card) => {
    // can't click on the same card twice

    if (choiceOne && choiceOne.id === card.id) return

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    
    console.log(card)

    // console.log(choiceOne)
    // console.log(choiceTwo)
    // console.log(choiceOne, choiceTwo)
  }

     // If the source of the first choice is the same as the source of the second choice, they are a match. THhey both need to have a value.

    useEffect(() => {
      if (choiceOne && choiceTwo) {
        setDisabled(true)
        if (choiceOne.src === choiceTwo.src) {
          console.log('match')
          setCards(prevCards => {
            const newCards = prevCards.map(card => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true }
              }
              return card
            })
            // Check for victory:
            if (newCards.every(card => card.matched)) {
              setGameWon(true)
              setFinalScore(turns)
            }
            return newCards
          })
          resetTurn()
        } else {
          console.log('not a match')
          setTimeout(() => resetTurn(), 1000)
        }
      }
    }, [choiceOne, choiceTwo])

  // Reset choices & increase turn

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
    
  }
  
 
  return (
    <div className="App">
      <h1>Memory Game</h1>

      {!gameStarted && <button className="start-button" onClick={shuffleCards}>New Game</button>}

      {!gameStarted && <Leaderboard />}

      {isLoading && gameStarted && (
        <>
        <div className="loading-screen">
          <h1 style={{paddingBottom: "100px", paddingTop: "100px", fontSize: "1em"}}>Loading Game...</h1>
          <div className="loading-spinner"></div>
        </div>
        </>
      )}

      {gameStarted && !isLoading && !gameWon && domLoaded &&( 
        <div className="card-grid">
        {cards.map(card => (
          <SingleCard card={card} 
          key={card.id} 
          handleChoice={handleChoice}
          flipped={card === choiceOne ||card === choiceTwo || card.matched}
          disabled={disabled}

           />
          ))}
      </div>
      )}

      {gameWon && <VictoryModal
        turns={finalScore}
        onSave={saveScore}
        onNewGame={shuffleCards}
      />}

      {gameStarted && !gameWon && <Gamestats turns={turns} />}
    </div>
  )
}

export default App
