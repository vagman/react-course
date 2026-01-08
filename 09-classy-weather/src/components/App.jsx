import React from 'react';
import Weather from './Weather.jsx';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: 'lisbon',
      isLoading: false,
      displayLocation: '',
      weather: {},
      countryCode: '',
    };
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  async fetchWeather() {
    try {
      this.setState({ isLoading: true });
      polyfillCountryFlagEmojis();

      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`);
      const geolocationData = await response.json();

      if (!geolocationData.results) throw new Error('Location not found');

      const { latitude, longitude, timezone, name, country_code } = geolocationData.results.at(0);
      this.setState({ displayLocation: name, countryCode: country_code });

      // 2) Getting actual weather
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherResponse.json();
      this.setState({ weather: weatherData.daily });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            placeholder="Search for location..."
            value={this.state.location}
            onChange={event => this.setState({ location: event.target.value })}
          />
        </div>
        <button className="btn" onClick={this.fetchWeather}>
          Get Weather
        </button>
        {this.state.isLoading && <p className="loader">Loading...</p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
            countryCode={this.state.countryCode}
          />
        )}
      </div>
    );
  }
}

export default App;
