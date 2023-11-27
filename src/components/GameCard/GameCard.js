import React from 'react'
import './GameCard.css';

export const GameCard = () => {
  return (
    <div className="game-box">
            <div className="game-team-home">
                <img className="game-team-image" src="/images/banner.png" alt="Home"/>
                <div className="game-team-name">
                    Manchester
                </div>
            </div>
            <div className="game-score">
                3-2
            </div>
            <div className="game-team-away">
                <div className="game-team-name">
                        Real
                </div>
                <img className="game-team-image" src="/images/banner.png" alt="Away"/>
            </div>
        </div>
  );
}



