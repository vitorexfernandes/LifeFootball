let currentRequests = null; // Inicialize com um valor padrão
let maxRequests = null; // Inicialize com um valor padrão
let games = [];
const containerMainGames= document.getElementById("mainContainer");
const containerGames= document.getElementById("game_container");
const selectedDateElement = document.getElementById("selectedDate");
const dataAtual = new Date();


selectedDateElement.textContent = dataAtual.toLocaleDateString() + " Games";

function displayGamesByLeague(games) {
    containerGames.innerHTML = ''; // Limpa o conteúdo anterior
    containerMainGames.innerHTML = ''; // Limpa o conteúdo anterior
    console.log('Displaying games...');

    if (!Array.isArray(games)) {
        console.error('Games não é um array:', games);
        return;
    }

    const selectedDateElementText = selectedDateElement.textContent.split(" ")[0].trim();
    const gamesByLeague = {};

    games.forEach((game) => {
        const dateParts = game.fixture.date.split('T')[0].split('-');
        const gameDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        const gameDateFormatted = gameDate.toLocaleDateString();
        console.log('Verificando data dos games...');
        if (gameDateFormatted === selectedDateElementText) {
            // Verifica se a liga já existe no objeto gamesByLeague, senão cria um novo array vazio.
            if (!gamesByLeague[game.league.name]) {
                gamesByLeague[game.league.name] = [];
            }

            gamesByLeague[game.league.name].push(game);
        }
    });

    for (const leagueName in gamesByLeague) {
        if (gamesByLeague.hasOwnProperty(leagueName)) {

            const leagueContainer = document.createElement('div');
            leagueContainer.className = 'league-container';

            const leagueTitle = document.createElement('p');
            leagueTitle.className = 'league-title';
            leagueTitle.id = 'selectedDate';
            leagueTitle.textContent = leagueName;

            leagueContainer.appendChild(leagueTitle);

            gamesByLeague[leagueName].forEach((game) => {
                const gameBoxHTML = createGameBox(game);
                const gameBoxElement = document.createElement('div');
                gameBoxElement.innerHTML = gameBoxHTML;
                leagueContainer.appendChild(gameBoxElement);
            });

            containerMainGames.appendChild(leagueContainer);
            }
    }
}

// //
function createGameBox(game) {
    let goalsHome = 0;
    let goalsAway = 0;
    if (game.goals.home == null || game.goals.away == null) {
        goalsHome = ' ';
        goalsAway = ' ';
    } else {
        goalsHome = game.goals.home;
        goalsAway = game.goals.away;
    }


    return `    
        <div class="game-box">
            <div class="game-team-home">
                <img class="game-team-image" src="${game.teams.home.logo}" alt="Home">
                <div class="game-team-name">
                    ${game.teams.home.name}
                </div>
            </div>
            <div class="game-score">
                ${goalsHome} - ${goalsAway}
            </div>
            <div class="game-team-away">
                <img class="game-team-image" src="${game.teams.away.logo}" alt="Away">
                <div class="game-team-name">
                    ${game.teams.away.name}
                </div>
            </div>
        </div>
    `;
}


//EVENTO PARA BUSCAR O CALENDARIO
document.addEventListener("DOMContentLoaded", function () {
    const dateButton = document.getElementById("date_picker_button");
    const liveButton = document.getElementById("live_picker_button");
    fetchGames('39',currentRequests,maxRequests)
    fetchGames('2',currentRequests,maxRequests)
    fetchGames('135',currentRequests,maxRequests)



    liveButton.addEventListener("click", function () {
        selectedDateElement.textContent = dataAtual.toLocaleDateString() + " Games";
        displayGamesByLeague(games);
    });


    flatpickr(dateButton, { dateFormat: "d-m-Y", onClose: 
            function (selectedDates) 
            {
                if (selectedDates.length > 0) 
                {
                    selectedDateElement.textContent = selectedDates[0].toLocaleDateString() + " Games";
                    displayGamesByLeague(games);
                }
            }
        });
});



