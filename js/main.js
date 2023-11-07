//Variables used to fetch data from the API via Java Script
let currentRequests = null; 
let maxRequests = null; 

//Variable that will contain the JSON data
let games = [];

//Variables that search for HTML elements
const containerMainGames= document.getElementById("mainContainer");
const containerGames= document.getElementById("game_container");
const selectedDateElement = document.getElementById("selectedDate");

//Date Variables
const dataAtual = new Date();

//Select start date 
selectedDateElement.textContent = dataAtual.toLocaleDateString() + " Games";





//Function to show matches from each league
function displayGamesByLeague(games) {
    containerGames.innerHTML = '';
    containerMainGames.innerHTML = '';
    console.log('Displaying games...');

    if (typeof games !== 'object') {
        console.error('Games is not an object:', games);
        return;
    }

    const selectedDateElementText = selectedDateElement.textContent.split(" ")[0].trim();
    const gamesByLeague = {};

    // Separacao por liga
    for (const gamesId in games) {
        if (games.hasOwnProperty(gamesId)) {
            const allGamesLeague = games[gamesId];
            console.log('League...',allGamesLeague.parameters.league);
            const responseArray = allGamesLeague.response;

            for (const game of responseArray) {
                const dateParts = game.fixture.date.split('T')[0].split('-');
                const gameDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
                const gameDateFormatted = gameDate.toLocaleDateString();
                console.log('Checking game dates...');

                if (gameDateFormatted === selectedDateElementText) {
                    // Checks if the league already exists in the gamesByLeague object, otherwise creates a new empty array.
                    if (!gamesByLeague[game.league.name]) {
                        gamesByLeague[game.league.name] = [];
                    }
    
                    gamesByLeague[game.league.name].push(game);
                }
            }
        }
    }

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


//Function to create game boxes 
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



document.addEventListener("DOMContentLoaded", function () {
    const dateButton = document.getElementById("date_picker_button");
    const liveButton = document.getElementById("live_picker_button");

    //When someone pays the API will be able to fetch the data directly.
        //fetchGames('39',currentRequests,maxRequests)
        //fetchGames('2',currentRequests,maxRequests)
        //fetchGames('135',currentRequests,maxRequests)

        
    // Função para ler o arquivo JSON e fazer a análise


    // Especifique o caminho para o arquivo local
    //const filePath = "../json/db.json";
    const filePath = "http://localhost:5500/json/db.json"

    function lerArquivoJSON() {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Process the JSON data here
                games = data;
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching or parsing JSON:', error);
            });
    }
    
    lerArquivoJSON();


    // LIVE BUTTON
    liveButton.addEventListener("click", function () {
        selectedDateElement.textContent = dataAtual.toLocaleDateString() + " Games";
        displayGamesByLeague(games);
    });

    // DATE BUTTON
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



