import React from 'react'
import './GameCard.css';

export const GameCard = (props) => {
const { homeTeam, awayTeam, date, goals } = props;
    return (
        <div className="game-box">
        <div className="game-team-home">
            <img className="game-team-image" src={homeTeam.logo} alt={homeTeam.name} />
            <div className="game-team-name">{homeTeam.name}</div>
        </div>
        <div className="game-score">{`${goals.home} - ${goals.away}`}</div>
        <div className="game-team-away">
            <div className="game-team-name">{awayTeam.name}</div>
            <img className="game-team-image" src={awayTeam.logo} alt={awayTeam.name} />
        </div>
        </div>
    );
};



