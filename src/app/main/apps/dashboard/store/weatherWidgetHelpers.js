import axios from 'axios';

async function getIP() {
  try {
    const res = await axios.get('https://api.ipify.org');
    return res.data;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    throw new Error('Could not fetch IP address.');
  }
}

async function getLocationByIP(ip) {
  try {
    const locationData = await axios.get(`https://ipinfo.io/${ip}?token=1ef1055fb92fa6`);
    return locationData.data;
  } catch (error) {
    console.error(`Error fetching location for IP ${ip}:`, error);
    throw new Error('Could not fetch location.');
  }
}

async function getWeather() {
  try {
    const ip = await getIP();
    const location = await getLocationByIP(ip);
    const res = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.city}?unitGroup=metric&key=XGBEDGJ87QKB94WDUSDZ7MCBJ&contentType=json`
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw new Error('Could not fetch weather information.');
  }
}

function changeWeatherWidgetData(cityWeather, data) {
  // Function to convert degrees given by API to corresponding direction
  const getWindDirection = degrees => {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW'
    ];
    const index = Math.round((degrees % 360) / 22.5) % 16;
    return directions[index];
  };

  // Function to get the day of the week from a date string
  const getDayOfWeek = dateString => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  // Function to generate the corresponding Material UI icon for the weather
  const getWeatherIcon = weatherIcon => {
    if (weatherIcon.includes('rain')) return 'rainy';
    if (weatherIcon.includes('cloud')) return 'cloudy';
    if (weatherIcon.includes('snow')) return 'snowy';
    if (weatherIcon.includes('wind')) return 'windy';
    return 'sunny';
  };

  // Updating the weather widget data
  const updatedData = [...data];
  const widget = updatedData[12].locations.NewYork;
  const { currentConditions } = cityWeather;

  widget.name = cityWeather.address;
  widget.temp.C = currentConditions.temp;
  widget.windDirection = getWindDirection(currentConditions.winddir);
  widget.rainProbability = currentConditions.precipprob.toString();
  widget.windSpeed.KMH = currentConditions.windspeed;

  // Updating the next 5 days weather data
  widget.next5Days = cityWeather.days.slice(0, 5).map(day => ({
    name: getDayOfWeek(day.datetime),
    icon: getWeatherIcon(day.icon),
    temp: {
      C: day.temp.toString(),
      F: '70'
    }
  }));

  return updatedData;
}

export { getIP, getLocationByIP, getWeather, changeWeatherWidgetData };
