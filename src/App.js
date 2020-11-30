import React, {useState} from 'react';
import './App.css';
import MeteorTable from './components/MeteorTable/MeteorTable'
import MapComponent from './components/Map/MapComponent';

function App() {

  const [pinData, setPinData] = useState([]);

  // function to catch meteor data of clicked row in meteor table and save in state
  const handleMeteorClick = (meteor) => {
    const tempArr = pinData;
    //tempArr.push(meteor.geolocation.coordinates);
    tempArr.push(meteor);
    setPinData([...tempArr]);
  }
  return (
    <div className="App">

      <div className="meteorTable-container">
        <MeteorTable handleRowClick={handleMeteorClick} />
      </div>

      <div className="meteorMap-container">
        <MapComponent pinData={pinData} />
      </div>

    </div>
  );
}

export default App;
