import React, { useState } from 'react';
import Banner from './components/Banner';
import GamesBody from './components/GamesBody';


function App() {
  const [showSelectionDate, setshowSelectionDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showButton, setShowButton] = useState(true);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setshowSelectionDate(false);
    setShowButton(true);
  };

  const toggleDatePicker = () => {
    setshowSelectionDate((prev) => !prev);
    setShowButton(false);
  };


  return (
    <div className="App">
      <Banner
        toggleDatePicker={toggleDatePicker}
        showButton={showButton}
        showSelectionDate={showSelectionDate}
        selectedDate={selectedDate}  // Pass selectedDate as a prop
        handleDateChange={handleDateChange}  // Pass handleDateChange as a prop

      />
      <GamesBody selectedDate={selectedDate.toLocaleDateString() + " Games"} />
    </div>
  );
}

export default App;
