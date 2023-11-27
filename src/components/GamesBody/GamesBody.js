import LeagueCard from '../LeagueCard'; // Remova as chaves { } aqui
import './GamesBody.css'

export const GamesBody = (props) => {
  return (
    <section className="main-container" id="mainContainer">
            <p className="title-body" id="selectedDate">{props.selectedDate}</p>
            <LeagueCard></LeagueCard>
    </section>
  );
}


