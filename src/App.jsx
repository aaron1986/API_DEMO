import { useState } from 'react';
import './App.css';
import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [locationdata, setLocationData] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const getData = () => {
    // Send a request to the LocationIQ API with latitude and longitude
    axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`)
      .then(response => {
        const displayName = response.data.display_name;
        setLocationData(displayName);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleLatitudeChange = event => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = event => {
    setLongitude(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    getData();
  };

  return (
    <>
      <h1>API DATA</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Latitude"
            value={latitude}
            onChange={handleLatitudeChange}
          />
          <input
            placeholder="Longitude"
            value={longitude}
            onChange={handleLongitudeChange}
          />
          <button type="submit">Get Location</button>
        </form>
        {locationdata ? <h2>{locationdata}</h2> : null}
      </div>
    </>
  );
}

export default App;
