function showweatherDetails(event) {
    event.preventDefault();
  
    // Get the city from input
    const city = document.getElementById('city').value;
    const apiKey = 'WEATHER_API_KEY'; // 
    const url = "http://api.weatherapi.com/v1/current.json";
    const apiUrl = `${url}?key=${apiKey}&q=${city}&aqi=no`;
  
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
  