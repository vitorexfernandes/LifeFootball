// This function fetches football fixtures for a specific league and season from the football.api-sports.io API.
// It first sends a request to check the API usage limits. If the current requests are within the daily limit, it proceeds to fetch the fixtures.
// The function handles errors and returns the fetched fixtures when successful.

function fetchGames(id, currentRequests, maxRequests) {
    // Define the API endpoints and API key.
    const apiUrlVerify = "https://v3.football.api-sports.io/status";
    const apiUrl = `https://v3.football.api-sports.io/fixtures?league=${id}&season=2023`;
    const apiKey = 'XXXXXXXXXXXXXXXXXXXXX';

    // Check the API usage limits by sending a request to apiUrlVerify.
    fetch(apiUrlVerify, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Unable to retrieve data from the API");
        }
        return res.json();
    })
    .then((data) => {
        // Update the current and maximum requests available from the API response.
        currentRequests = data.response.requests.current;
        maxRequests = data.response.requests.limit_day;
        console.log("Value of 'current':", currentRequests);
        console.log("Value of 'limit':", maxRequests);

        // If the current requests are within the daily limit, fetch the fixtures.
        if (currentRequests < maxRequests) {
            return fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': 'v3.football.api-sports.io'
                }
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Unable to retrieve data from the API");
                }
                return res.json();
            })
            .then((data) => {
                // Concatenate the fetched fixture data to the 'games' array and return it.
                games = games.concat(data.response);
                return games;
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
