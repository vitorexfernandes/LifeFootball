import React from 'react'
import './GameCard.css';

export const GameCard = (props) => {
const { homeTeam, awayTeam,  goals } = props;
const homeGoals = goals.home ?? '';
const awayGoals = goals.away ?? '';
    return (
        <div className="game-box">
        <div className="game-team-home">
            <img className="game-team-image" src={homeTeam.logo} alt={homeTeam.name} />
            <div className="game-team-name">{homeTeam.name}</div>
        </div>
        <div className="game-score">{`${homeGoals} - ${awayGoals}`}</div>
        <div className="game-team-away">
            <div className="game-team-name">{awayTeam.name}</div>
            <img className="game-team-image" src={awayTeam.logo} alt={awayTeam.name} />
        </div>
        </div>
    );
};



