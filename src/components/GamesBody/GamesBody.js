import React from 'react'
import LeagueCard from '../LeagueCard'; 
import './GamesBody.css'

export const GamesBody = (props) => {

  const fixturesByLeague = {};


  // Group fixtures by league
  props.fixtures.forEach((fixture) => {
    const leagueId = fixture.league.id;
    if (!fixturesByLeague[leagueId]) {
      fixturesByLeague[leagueId] = [];
    }
    fixturesByLeague[leagueId].push(fixture);
  });

   // Filter fixtures by selected date
  const fixturesBySelectedDate = Object.keys(fixturesByLeague).reduce((result, leagueId) => {
    const leagueFixtures = fixturesByLeague[leagueId].filter((fixture) => fixture.date === props.selectedDate);
      
      if (leagueFixtures.length > 0) {
        result[leagueId] = leagueFixtures;
      }

      return result;
  }, {});

  console.log('props.selectedDate -',props.selectedDate)
  console.log('FixturebyLeague -',fixturesByLeague)
  console.log('fixturesByLeagueByDate - ',fixturesBySelectedDate)

  const leagueCards = Object.entries(fixturesBySelectedDate).map(([leagueId, leagueFixtures]) => (
    <LeagueCard
      key={leagueId}
      leagueId={leagueId}
      leagueFixtures={leagueFixtures}
    />
  ));

  return (
    <section className='main-container' id='mainContainer'>
      <p className='title-body' id='selectedDate'>{props.selectedDate} Games</p>
      {leagueCards}
    </section>
  );
}


