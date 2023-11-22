import LeagueCard from '../LeagueCard'; // Remova as chaves { } aqui

import './MainContainer.css';

export const MainContainer = () => {
  return (
    <section className="main-container" id="mainContainer">
      <p className="title-body" id="selectedDate"></p>
      <LeagueCard></LeagueCard>
    </section>
  );
}
