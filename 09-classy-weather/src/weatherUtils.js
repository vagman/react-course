function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], '☀️'],
    [[1], '🌤️'],
    [[2], '⛅'],
    [[3], '☁️'],
    [[45, 48], '🌫️'],
    [[51, 56, 61, 66, 80], '🌦️'],
    [[53, 55, 63, 65, 57, 67, 81, 82], '🌧️'],
    [[71, 73, 75, 77, 85, 86], '🌨️'],
    [[95], '🌩️'],
    [[96, 99], '⛈️'],
  ]);

  const array = [...icons.keys()].find(key => key.includes(wmoCode));

  if (!array) return 'NOT FOUND';
  return icons.get(array);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
  }).format(new Date(dateStr));
}

function getCountryIcon(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export { getWeatherIcon, formatDay, getCountryIcon };
