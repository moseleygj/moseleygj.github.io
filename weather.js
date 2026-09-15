 async function getWeather() {
      const lat = "40.7128";
      const lon = "-74.0060";
      const apiKey = "f23c1402a5ab30b4be4811194cc4c2be"; 
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          const temp = data.main.temp;
          const desc = data.weather[0].description;
          const icon = data.weather[0].icon;

          document.getElementById("weather").innerHTML = `
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
            <p><strong>${Math.round(temp)}°</strong></p>
            <p class="weather-desc">${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
          `;
        } else {
          document.getElementById("weather").innerHTML = `<p style="font-size: 20px;">Error: ${data.message}</p>`;
        }
      } catch (error) {
        document.getElementById("weather").innerHTML = '<p style="font-size: 20px;">Network error. Try again later.</p>';
        console.error(error);
      }
    }
    getWeather();