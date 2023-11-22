import './GameCard.css';

export const GameCard = () => {
  return (
    <div class="game-box">
            <div class="game-team-home">
                <img className="game-team-image" src="/images/banner.png" alt="Home"/>
                <div class="game-team-name">
                    Manchester
                </div>
            </div>
            <div class="game-score">
                3-2
            </div>
            <div class="game-team-away">
                <div class="game-team-name">
                        Real
                </div>
                <img className="game-team-image" src="/images/banner.png" alt="Away"/>
            </div>
        </div>
  );
}



