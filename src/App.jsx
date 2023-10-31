import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Map from './Map';
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [locationdata, setLocationData] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const getData = () => {
    axios.get(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${locationQuery}&format=json`)
      .then(response => {
        const { lat, lon } = response.data[0];
        setLocationData(`Latitude: ${lat}, Longitude: ${lon}`);
        setLat(lat);
        setLon(lon);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleLocationQueryChange = event => {
    setLocationQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    getData();
  };

  const handleReset = () => {
    setLocationQuery('');
    setLocationData('');
    setLat(null);
    setLon(null);
  };

  return (
    <>
      <h1>API DATA</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Location"
            value={locationQuery}
            onChange={handleLocationQueryChange}
          />
          <button type="submit">Get Location</button>
        </form>
        {locationdata ? <h2>{locationdata}</h2> : null}
        {lat && lon && <Map lat={lat} lon={lon} />}

<div id="button-container">
<button id="reset" onClick={handleReset}>Reset</button>
</div>
        
      </div>
    </>
  );
}

export default App;
