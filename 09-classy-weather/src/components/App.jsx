// Lecture 181: Removing Boilerplate Code with Class Fields (Modern React)

import React from 'react';
import Weather from './Weather.jsx';
import Input from './Input.jsx';

import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';

class App extends React.Component {
  state = {
    location: '',
    isLoading: false,
    displayLocation: '',
    weather: {},
    countryCode: '',
  };

  fetchWeather = async () => {
    if (this.state.location.length < 3) return this.setState({ weather: {} });

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
  };

  setLocation = event => this.setState({ location: event.target.value });

  // useEffect() [] replacement
  componentDidMount() {
    // this.fetchWeather();

    this.setState({ location: localStorage.getItem('location') || '' });
  }

  // useEffect() [location] replacement
  componentDidUpdate(prevProps, prevState) {
    if (prevState.location !== this.state.location) {
      this.fetchWeather();
    }

    localStorage.setItem('location', this.state.location);
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <Input value={this.props.location} location={this.state.location} onChangeLocation={this.setLocation} />
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
