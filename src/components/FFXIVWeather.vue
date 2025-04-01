<template>
  <div class="weather-container">
    <h1>FFXIV Weather Forecast</h1>

    <div class="controls">
      <div class="time-display">
        <div class="clock">
          <span class="clock-eorzea"></span> Eorzean Time
        </div>
        <div class="clock">
          <span class="clock-local"></span> Local Time
        </div>
        <div class="clock">
          <span class="clock-server"></span> Server Time
        </div>
      </div>

      <div class="location-selector">
        <label for="region">Region:</label>
        <select id="region" v-model="selectedRegion" @change="updateLocations">
          <option v-for="(region, index) in regions" :key="index" :value="index">
            {{ region[0] }}
          </option>
        </select>

        <label for="location">Location:</label>
        <select id="location" v-model="selectedLocation">
          <option v-for="(loc, index) in currentLocations" :key="index" :value="loc">
            {{ loc }}
          </option>
        </select>

        <button @click="getWeather">Get Weather</button>
      </div>
    </div>

    <div class="weather-display" v-if="currentWeather">
      <h2>{{ selectedLocation }}</h2>
      <div class="current-weather">
        <div class="weather-icon" :class="'weather-' + currentWeather.icon">
          <i :class="'xiv ' + currentWeather.icon + '-chs'"></i>
        </div>
        <div class="weather-info">
          <p><strong>Current Weather:</strong> {{ currentWeather.name }}</p>
          <p><strong>Time:</strong> {{ formatTime(currentWeather.timestamp) }}</p>
        </div>
      </div>

      <h3>Forecast</h3>
      <div class="forecast">
        <div v-for="(forecast, index) in weatherForecast" :key="index" class="forecast-item">
          <div class="weather-icon" :class="'weather-' + forecast.icon">
            <i :class="'xiv ' + forecast.icon + '-chs'"></i>
          </div>
          <div class="forecast-info">
            <p><strong>{{ forecast.name }}</strong></p>
            <p>{{ formatTime(forecast.timestamp) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="weather-help" v-else>
      <p>Select a location and click "Get Weather" to see the forecast</p>
    </div>
  </div>
</template>

<script>
import Weather from '@/assets/js/ffxiv-weather.js';

export default {
  data() {
    return {
      regions: [],
      selectedRegion: 0,
      currentLocations: [],
      selectedLocation: '',
      currentWeather: null,
      weatherForecast: [],
      weather: new Weather()
    };
  },
  mounted() {
    // Initialize regions and locations
    this.regions = this.weather.areas;
    this.updateLocations();

    // Set default location
    if (this.currentLocations.length > 0) {
      this.selectedLocation = this.currentLocations[0];
    }
  },
  methods: {
    updateLocations() {
      if (this.regions[this.selectedRegion]) {
        this.currentLocations = this.regions[this.selectedRegion].slice(1);
        this.selectedLocation = this.currentLocations[0];
      }
    },
    getWeather() {
      if (!this.selectedLocation) return;

      // Get current weather
      const now = Date.now();
      const current = this.weather.getWeather(this.selectedLocation, now);

      this.currentWeather = {
        name: current,
        icon: current,
        timestamp: now
      };

      // Get forecast (next 5 weather changes)
      this.weatherForecast = [];
      let forecastTime = now;

      for (let i = 0; i < 5; i++) {
        forecastTime += 8 * 175000; // 8 Eorzean hours (1 weather cycle)
        const weather = this.weather.getWeather(this.selectedLocation, forecastTime);

        this.weatherForecast.push({
          name: weather,
          icon: weather,
          timestamp: forecastTime
        });
      }
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      const eorzea = this.weather.getEorzeanTimes(timestamp);

      return `${date.toLocaleString()} (ET ${eorzea[1]}:${eorzea[0].toString().padStart(2, '0')})`;
    }
  }
};
</script>

<style>
.weather-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.controls {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.time-display {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
  padding: 10px;
  background: #eaeaea;
  border-radius: 5px;
}

.location-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.location-selector select, .location-selector button {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.location-selector button {
  background: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.location-selector button:hover {
  background: #45a049;
}

.weather-display {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.current-weather {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.weather-icon {
  font-size: 2em;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 50%;
}

.forecast {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
}

.forecast-item {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.forecast-info {
  margin-top: 10px;
}

.forecast-info p {
  margin: 5px 0;
  font-size: 0.9em;
}

.weather-help {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>