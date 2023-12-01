import React from 'react'
import GameCard from '../GameCard'; // Remova as chaves { } aqui

import './LeagueCard.css'

export const LeagueCard = (props) => {

  const { leagueId, leagueFixtures } = props;

  return (
    <div key={leagueId} className='league-card'>
        <h1 className='league-title'>{leagueFixtures[0].league.name}</h1>
        {leagueFixtures.map((fixture) => (
              <GameCard
                key={fixture.id}
                homeTeam={fixture.homeTeam}
                awayTeam={fixture.awayTeam}
                date={fixture.date}
                goals={fixture.goals}
              />
          ))}
    </div>
  );
}
