function fetchGames(id,currentRequests,maxRequests){
    // REQUEST PARA BUSCAR DADOS DO LIMITE DE REQUEST DIARIO
    const apiUrlVerify = "https://v3.football.api-sports.io/status";
    const apiUrl = `https://v3.football.api-sports.io/fixtures?league=${id}&season=2023`;
    const apiKey = '4c6222a3bb2b31400db5c2c97fadf279';

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
            return fetch(apiUrl, {
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
                games = games.concat(data.response);
                return games
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