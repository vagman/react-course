import Spinner from './Spinner.jsx';
import CityItem from './CityItem.jsx';
import Message from './Message.jsx';
import CountryItem from './CountryItem.jsx';

import styles from './CountryList.module.css';

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map." />;

  const countries = cities.reduce((citiesArray, currentCity) => {
    if (!citiesArray.map(el => el.country).includes(currentCity.country))
      return [...citiesArray, { country: currentCity.country, emoji: currentCity.emoji }];
    else return citiesArray;
  }, []);

  return (
    <div className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </div>
  );
}

export default CountryList;
