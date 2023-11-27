import Banner from './components/Banner';
import GamesBody from './components/GamesBody';





function App() {
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

  document.addEventListener("DOMContentLoaded", function () {
    const dateButton = document.getElementById("date_picker_button");
    const liveButton = document.getElementById("live_picker_button");
    
    // LIVE BUTTON
    liveButton.addEventListener("click", function () {
        selectedDateElement.textContent = dataAtual.toLocaleDateString() + " Games";
    });
  
    // DATE BUTTON
    flatpickr(dateButton, { dateFormat: "d-m-Y", onClose: 
            function (selectedDates) 
            {
                if (selectedDates.length > 0) 
                {
                    selectedDateElement.textContent = selectedDates[0].toLocaleDateString() + " Games";
                }
            }
        }); 
  });

  return (
    <div className="App">
      <Banner />
      <GamesBody  selectedDate={selectedDateElement.textContent} />
    </div>
  );
}

export default App;


