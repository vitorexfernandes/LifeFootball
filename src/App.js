import React, { useState , useEffect  } from 'react';
import Banner from './components/Banner';
import GamesBody from './components/GamesBody';




function App() {
  const [showSelectionDate, setshowSelectionDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showButton, setShowButton] = useState(true);
  const [fixtures,setFixtures] = useState([]);

  useEffect(() => {
    fetch('./db.json', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const fixturesData = Object.values(res).map(item => item.response).flat();
  
        const formattedFixtures = fixturesData.map(fixture => {
          const date = new Date(fixture.fixture.date);
          const homeTeam = fixture.teams.home;
          const awayTeam = fixture.teams.away;
  
          return {
            id: fixture.fixture.id,
            date: date.toLocaleDateString(),
            homeTeam: {
              id: homeTeam.id,
              name: homeTeam.name,
              logo: homeTeam.logo,
              winner: homeTeam.winner,
            },
            awayTeam: {
              id: awayTeam.id,
              name: awayTeam.name,
              logo: awayTeam.logo,
              winner: awayTeam.winner,
            },
            goals: {
              home: fixture.goals.home,
              away: fixture.goals.away,
            },
            league: {
              id: fixture.league.id,
              name: fixture.league.name,
              country: fixture.league.country,
              logo: fixture.league.logo,
            },
          };
        });
  
        setFixtures(formattedFixtures);
        console.log('Formatted Fixtures:', fixtures);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setshowSelectionDate(false);
    setShowButton(true);
  };

  const toggleDatePicker = () => {
    setshowSelectionDate((prev) => !prev);
    setShowButton(false);
  };

  const toggleLivePicker= ()=>{
    setSelectedDate(new Date());
  };


  return (
    <div className="App">
      <Banner
        toggleDatePicker={toggleDatePicker}
        toggleLivePicker={toggleLivePicker}
        showButton={showButton}
        showSelectionDate={showSelectionDate}
        selectedDate={selectedDate}  
        handleDateChange={handleDateChange}  
      />
      <GamesBody 
      selectedDate={selectedDate.toLocaleDateString()} 
      fixtures = {fixtures}
      />
    </div>
  );
}

export default App;
