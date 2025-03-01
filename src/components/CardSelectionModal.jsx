import "./CardSelectionModal.css";

export function CardSelectionModal({ show, onClose, onConfirm, images, selectedCard, onCardSelect }) {
    if (!show)
      return null;

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Select a Card</h2>
                    </div>
                        <div className="card-grid2">
                            {images.map((card) => (
                                <div
                                    key={card.id}
                                    className={`card-item ${selectedCard?.id === card.id ? "" : "selected"}`}
                                    onClick={() =>  onCardSelect(card)}
                                >
                                    <img src={card.src} 
                                    alt={`Card ${card.id}`}
                                     />
                                </div>
                            ))}
                       
                    </div>

                    <div className="modal-footer">
                        <button onClick={onConfirm} className="modal-ok-button">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}



export default CardSelectionModal;