function showweatherDetails(event) {
    event.preventDefault();
  
    // Get the city from input
    const city = document.getElementById('city').value;
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;
    const apiKey = 'API_KEY'; // Ensure this key is valid
    const url = "http://api.weatherapi.com/v1/current.json";
    let query = `${city}` || `${lat}, ${lon}`;
    let apiUrl = `${url}?key=${apiKey}&q=${query}&aqi=no`;
    let status = document.getElementById('status')
  
    // Make sure the user inputted information
    console.log('city: ', city, ' lat: ', lat, ' lon: ', lon)
    // user must input city OR latitude and longitudeß
    if(!city){
        if((!lat) || (!lon)){
            status.innerHTML = 'have you entered a city or both latitude and longitude?'

            return;
        }
    }
    // Make the request
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Extract weather details
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `
          <p><strong>Location:</strong> ${data.location.name}, ${data.location.region}, ${data.location.country}</p>
          <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
          <p><strong>Condition:</strong> ${data.current.condition.text}</p>
          <img src="${data.current.condition.icon}" alt="Weather Icon">
        `;
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        document.getElementById('weatherInfo').innerHTML = `<p>Error fetching weather details. Please try again.</p>`;
      });
  }
  
  // Add event listener to the form
  document.getElementById('weatherForm').addEventListener('submit', showweatherDetails);
  