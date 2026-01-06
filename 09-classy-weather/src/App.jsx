import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'lisbon',
    };
  }

  fetchWeather() {
    console.log('Loading weather data...');
    console.log(this);
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
        <button onClick={this.fetchWeather()}>Get Weather</button>
      </div>
    );
  }
}

export default App;
