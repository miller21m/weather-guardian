import CurrentWeather from "../components/CurrentWeather";

import './Home.css'
function Home() {
  return (
    <div className="home-page-container">
      <div className="show-location-weather">
        <CurrentWeather></CurrentWeather>
      </div>
    </div>
  );
}

export default Home;