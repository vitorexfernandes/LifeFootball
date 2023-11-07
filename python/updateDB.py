# Import necessary libraries
import pandas as pd
import requests
import json

# Set up the API request headers
payload = {}
headers = {
  'x-rapidapi-key': '4c6222a3bb2b31400db5c2c97fadf279',
  'x-rapidapi-host': 'v3.football.api-sports.io'
}

# Send a GET request to retrieve status data from the API
calls = requests.request("GET", "https://v3.football.api-sports.io/status", headers=headers, data=payload)

# Define the API endpoint for football leagues
url = "https://v3.football.api-sports.io/leagues"

# Analyze the JSON response received
datacalls = calls.json()

# Extract the 'current' and 'limit_day' values from the API response
current_value = datacalls['response']['requests']['current']
limit_value = datacalls['response']['requests']['limit_day']

# Print the 'current' value
print("Value of 'current':", current_value)

# Create an empty list to store fixture data
fixture_data = []

# Define a list of league IDs for which you want to fetch fixtures
idDasLeagues = ['2', '39', '135', '78', '61', '140']

# Loop pelas IDs de liga
for league_id in league_ids:
    # Construa o endpoint da API para buscar fixtures para uma liga específica e temporada
    url = f"https://v3.football.api-sports.io/fixtures?league={league_id}&season=2023"
    
    # Envie uma solicitação GET para buscar os dados de fixtures
    response = requests.get(url, headers=headers)

    # Verifique se o código de status da resposta é 200 (OK)
    if response.status_code == 200:
        data = response.json()
        fixture_data[league_id] = data
    else:
        print(f"Erro na solicitação para a liga {league_id}. Código de status: {response.status_code}")

# Especifique o nome do arquivo onde você deseja salvar os dados JSON
file_name = "db.json"

# Salve os dados em formato JSON em um arquivo
with open(file_name, 'w') as json_file:
    json.dump(fixture_data, json_file)

# Imprima uma mensagem indicando que o processo foi concluído com sucesso
print("Os dados foram salvos com sucesso em 'fixtures.json'")
