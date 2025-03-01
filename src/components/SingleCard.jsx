import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" loading="lazy" />
        <img
          className="back"
          src={card.backSrc || "/img/cover.png"}
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}