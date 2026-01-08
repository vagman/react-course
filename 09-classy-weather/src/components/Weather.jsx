import React from 'react';
import Day from './Day.jsx';
import { getCountryIcon } from '../weatherUtils.js';

class Weather extends React.Component {
  componentsWillUnmount() {
    console.log('Weather component unmounted');
  }

  render() {
    const { temperature_2m_max: max, temperature_2m_min: min, time: dates, weathercode: codes } = this.props.weather;
    const { countryCode } = this.props;

    return (
      <div>
        <h2>
          Weather in {this.props.location} {getCountryIcon(countryCode)}
        </h2>

        <div className="weather">
          {dates.map((date, i) => (
            <Day key={date} date={date} max={max.at(i)} min={min.at(i)} code={codes.at(i)} isToday={i === 0} />
          ))}
        </div>
      </div>
    );
  }
}

export default Weather;
