import GameCard from '../GameCard'; // Remova as chaves { } aqui

import './LeagueCard.css'

export const LeagueCard = () => {
  return (
    <div className='league-card'>
        <h1 className='league-title'>League Name</h1>
        <GameCard></GameCard>
    </div>
  );
}
