const containerGames= document.getElementById("game_container");
const selectedDateElement = document.getElementById("selectedDate");
let currentRequests = null; // Inicialize com um valor padrão
let maxRequests = null; // Inicialize com um valor padrão
let games = null;
const dataAtual = new Date();
const apiUrlVerify = "https://v3.football.api-sports.io/status";
const apiUrl = "https://v3.football.api-sports.io/fixtures?league=2&season=2023";
const apiKey = '4c6222a3bb2b31400db5c2c97fadf279';



selectedDateElement.textContent = dataAtual.toLocaleDateString() + " Games";



function fetchGames(){
    // REQUEST PARA BUSCAR DADOS DO LIMITE DE REQUEST DIARIO
    fetch(apiUrlVerify, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Não foi possível obter os dados da API");
        }
        return res.json();
    })
    .then((data) => {
        currentRequests = data.response.requests.current;
        maxRequests = data.response.requests.limit_day;
        console.log("Valor de 'current':", currentRequests);
        console.log("Valor de 'limit':", maxRequests);

        //Verfica se atingiu limite diario de requests
        if (currentRequests < maxRequests) {
            // REQUEST PARA BUSCAR DADOS DAS PARTIDAS
            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': 'v3.football.api-sports.io'
                }
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Não foi possível obter os dados da API");
                }
                return res.json();
            })
            .then((data) => {
                games = data.response;
            })
            .catch((error) => {
                console.error(error);
            });
        }
    })
    .catch((error) => {
        console.error(error);
    });
};


function displayGames(games) {
    containerGames.innerHTML = ''; // Limpa o conteúdo anterior

    if (!Array.isArray(games)) {
        console.error('Games não é um array:', games);
        return;
    }

    const selectedDateElementText = selectedDateElement.textContent.split(" ")[0].trim();
    const uniqueDates = new Set();

    games.forEach((game) => {
        const dateParts = game.fixture.date.split('T')[0].split('-');
        const gameDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        const gameDateFormatted = gameDate.toLocaleDateString();

        if (gameDateFormatted === selectedDateElementText) {
            containerGames.innerHTML += createGameBox(game);
            uniqueDates.add(gameDateFormatted);
        }
    });

    const uniqueDatesArray = Array.from(uniqueDates);
}
// //
function createGameBox(game) {
    return `
        <div class="game-box">
            <div class="game-team-home">
                <img class="game-team-image" src="${game.teams.home.logo}" alt="Home">
                <div class="game-team-name">
                    ${game.teams.home.name}
                </div>
            </div>
            <div class="game-score">
                ${game.goals.home} - ${game.goals.away}
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
    fetchGames()

    liveButton.addEventListener("click", function () {
        selectedDateElement.textContent = dataAtual.toLocaleDateString() + " Games";
        displayGames(games);
    });


    flatpickr(dateButton, { dateFormat: "d-m-Y", onClose: 
            function (selectedDates) 
            {
                if (selectedDates.length > 0) 
                {
                    selectedDateElement.textContent = selectedDates[0].toLocaleDateString() + " Games";
                    displayGames(games);
                }
            }
        });
});



