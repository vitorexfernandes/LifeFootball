//Variables used to fetch data from the API via Java Script
let currentRequests = null; 
let maxRequests = null; 

//Variable that will contain the JSON data
let games = [];

//Variables that search for HTML elements
const containerMainGames= document.getElementById("mainContainer");
const selectedDateElement = document.getElementById("selectedDate");

//Date Variables
const dataAtual = new Date();

//Select start date 
selectedDateElement.textContent = dataAtual.toLocaleDateString() + " Games";



//Function to show matches from each league
function getGamesByDate(games) {
    containerMainGames.innerHTML = ''; // Clear the main container
    console.log('Displaying games...');

    if (typeof games !== 'object') {
        console.error('Games is not an object:', games);
        return;
    }

    const selectedDateElementText = selectedDateElement.textContent.split(" ")[0].trim();
    const gamesByLeague = {};

    // Iterate through game data
    for (const gamesId in games) {
        if (games.hasOwnProperty(gamesId)) {
            const allGamesLeague = games[gamesId];
            const responseArray = allGamesLeague.response;

            for (const game of responseArray) {
                const dateParts = game.fixture.date.split('T')[0].split('-');
                const gameDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
                const gameDateFormatted = gameDate.toLocaleDateString();

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
    return gamesByLeague
}

// Function through leagues and display games
function getGamesByDateAndLeagues(gamesByLeague){
    for (const leagueName in gamesByLeague) {
        if (gamesByLeague.hasOwnProperty(leagueName)) {

            const leagueContainer = document.createElement('div');
            leagueContainer.className = 'league-container';

            const leagueTitle = document.createElement('p');
            leagueTitle.className = 'league-title';
            leagueTitle.id = 'selectedDate';
            leagueTitle.textContent = leagueName;

            leagueContainer.appendChild(leagueTitle);

            const gameBoxElement = document.createElement('div');
            gameBoxElement.classList.add('game-container');
            

            gamesByLeague[leagueName].forEach((game) => {
                const gameBoxHTML = createGameBox(game);
                gameBoxElement.innerHTML += gameBoxHTML;
            });

            leagueContainer.appendChild(gameBoxElement);

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
                <div class="game-team-name">
                    ${game.teams.away.name}
                </div>
                <img class="game-team-image" src="${game.teams.away.logo}" alt="Away">
            </div>
        </div>
    `;
}

// Reading JSON file and parsing it
function lerArquivoJSON(filePath) {
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

document.addEventListener("DOMContentLoaded", function () {
    const dateButton = document.getElementById("date_picker_button");
    const liveButton = document.getElementById("live_picker_button");

    //When pays the API will be able to fetch the data directly.
        //fetchGames('39',currentRequests,maxRequests)
        //fetchGames('2',currentRequests,maxRequests)
        //fetchGames('135',currentRequests,maxRequests)
    
    // Specify the path to the local file
    // const filePath = "../json/db.json";
    const filePath = "./json/db.json"


    lerArquivoJSON(filePath);
    liveButton.click()

    // LIVE BUTTON
    liveButton.addEventListener("click", function () {
        selectedDateElement.textContent = dataAtual.toLocaleDateString() + " Games";
        gamesByLeague = getGamesByDate(games);
        getGamesByDateAndLeagues(gamesByLeague)
    });

    // DATE BUTTON
    flatpickr(dateButton, { dateFormat: "d-m-Y", onClose: 
            function (selectedDates) 
            {
                if (selectedDates.length > 0) 
                {
                    selectedDateElement.textContent = selectedDates[0].toLocaleDateString() + " Games";
                    gamesByLeague = getGamesByDate(games);
                    getGamesByDateAndLeagues(gamesByLeague)
                }
            }
        });
    

});



