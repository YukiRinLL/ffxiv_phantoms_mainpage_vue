<template>
  <div class="weather-container">
    <h1>FFXIV Weather Forecast</h1>

    <div class="controls">
      <div class="time-display">
        <div class="clock">
          <span class="clock-eorzea">{{ eorzeaTime }}</span> Eorzean Time
        </div>
        <div class="clock">
          <span class="clock-local">{{ localTime }}</span> Local Time
        </div>
        <div class="clock">
          <span class="clock-server">{{ serverTime }}</span> Server Time
        </div>
      </div>

      <div class="location-selector">
        <label for="region">Region:</label>
        <select id="region" v-model="selectedRegion" @change="updateLocations">
          <option v-for="(region, index) in regions" :key="index" :value="index">
            {{ region.name }}
          </option>
        </select>

        <label for="location">Location:</label>
        <select id="location" v-model="selectedLocation">
          <option v-for="(location, index) in currentLocations" :key="index" :value="location">
            {{ location }}
          </option>
        </select>

        <button @click="getWeather" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : 'Get Weather' }}
        </button>
      </div>
    </div>

    <div class="weather-display" v-if="currentWeather">
      <h2>{{ selectedLocation }}</h2>
      <div class="current-weather">
        <div class="weather-icon">
          <img :src="getWeatherIconUrl(currentWeather.name)" :alt="currentWeather.name" width="64" height="64">
        </div>
        <div class="weather-info">
          <p><strong>Current Weather:</strong> {{ currentWeather.name }}</p>
          <p><strong>Time:</strong> {{ formatTime(currentWeather.timestamp) }}</p>
        </div>
      </div>

      <h3>8 Eorzean Hour Forecast</h3>
      <div class="forecast">
        <div v-for="(forecast, index) in weatherForecast" :key="index" class="forecast-item">
          <div class="weather-icon">
            <img :src="getWeatherIconUrl(forecast.name)" :alt="forecast.name" width="48" height="48">
          </div>
          <div class="forecast-info">
            <p><strong>{{ forecast.name }}</strong></p>
            <p>{{ formatTime(forecast.timestamp) }}</p>
            <p class="forecast-time">In {{ index + 1 }} ET hour{{ index > 0 ? 's' : '' }}</p>
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
import { WEATHER_CONFIG, TIME_FORMATS } from '@/config/constants'

export default {
  data() {
    return {
      regions: WEATHER_CONFIG.REGIONS,
      selectedRegion: 0,
      currentLocations: [],
      selectedLocation: '',
      currentWeather: null,
      weatherForecast: [],
      isLoading: false,
      eorzeaTime: '00:00',
      localTime: '00:00',
      serverTime: '00:00',
      timeInterval: null
    }
  },
  mounted() {
    this.updateLocations()
    this.startClock()
  },
  beforeDestroy() {
    clearInterval(this.timeInterval)
  },
  methods: {
    updateLocations() {
      if (this.regions[this.selectedRegion]) {
        this.currentLocations = this.regions[this.selectedRegion].locations
        if (this.currentLocations.length > 0) {
          this.selectedLocation = this.currentLocations[0]
        }
      }
    },
    startClock() {
      this.updateClock()
      this.timeInterval = setInterval(this.updateClock, 1000)
    },
    updateClock() {
      const now = new Date()
      this.localTime = now.toLocaleTimeString([], TIME_FORMATS.local)
      this.serverTime = now.toLocaleTimeString([], TIME_FORMATS.server)

      // Calculate Eorzean time
      const eorzeaHours = Math.floor((now.getTime() / (WEATHER_CONFIG.EORZEAN_TIME_RATIO * 1000)) * 60 % 24)
      const eorzeaMinutes = Math.floor((now.getTime() / (WEATHER_CONFIG.EORZEAN_TIME_RATIO * 1000)) * 60 % 60)
      this.eorzeaTime = `${eorzeaHours.toString().padStart(2, '0')}:${eorzeaMinutes.toString().padStart(2, '0')}`
    },
    async getWeather() {
      if (!this.selectedLocation) return

      this.isLoading = true
      try {
        const now = Date.now()

        // In a real implementation, you would call your weather calculation logic here
        // This is a mock implementation for demonstration
        const weatherTypes = Object.keys(WEATHER_CONFIG.WEATHER_ICONS)
        const currentWeatherName = this.calculateWeather(this.selectedLocation, now)

        this.currentWeather = {
          name: currentWeatherName,
          timestamp: now
        }

        // Generate forecast for next 5 weather cycles (8 ET hours each)
        this.weatherForecast = Array.from({ length: 5 }, (_, i) => {
          const forecastTime = now + (i + 1) * WEATHER_CONFIG.WEATHER_CYCLE_DURATION
          const forecastWeather = this.calculateWeather(this.selectedLocation, forecastTime)
          return {
            name: forecastWeather,
            timestamp: forecastTime
          }
        })
      } catch (error) {
        console.error('Error getting weather:', error)
      } finally {
        this.isLoading = false
      }
    },
    calculateWeather(location, timestamp) {
      // This should be replaced with actual FFXIV weather calculation logic
      // For now, we'll return a random weather for demonstration
      const weatherTypes = Object.keys(WEATHER_CONFIG.WEATHER_ICONS)
      return weatherTypes[Math.floor(Math.random() * weatherTypes.length)]
    },
    formatTime(timestamp) {
      const date = new Date(timestamp)
      const eorzeaHours = Math.floor((timestamp / (WEATHER_CONFIG.EORZEAN_TIME_RATIO * 1000)) * 60 % 24)
      const eorzeaMinutes = Math.floor((timestamp / (WEATHER_CONFIG.EORZEAN_TIME_RATIO * 1000)) * 60 % 60)

      return `${date.toLocaleString([], TIME_FORMATS.local)} (ET ${eorzeaHours}:${eorzeaMinutes.toString().padStart(2, '0')})`
    },
    getWeatherIconUrl(weatherName) {
      return WEATHER_CONFIG.WEATHER_ICONS[weatherName]?.url || ''
    },
    getWeatherClass(weatherName) {
      return WEATHER_CONFIG.WEATHER_ICONS[weatherName]?.class || 'weather-unknown'
    }
  }
}
</script>

<style scoped>
.weather-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.controls {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.time-display {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 15px;
  background: #e9ecef;
  border-radius: 6px;
  font-size: 0.95em;
}

.clock {
  text-align: center;
}

.clock span {
  font-weight: bold;
  display: block;
  font-size: 1.1em;
  color: #495057;
}

.location-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.location-selector label {
  font-weight: 500;
  color: #495057;
}

.location-selector select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  background: white;
  min-width: 180px;
}

.location-selector button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background: #4e9af1;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.location-selector button:hover {
  background: #3a8ae4;
}

.location-selector button:disabled {
  background: #b0c4de;
  cursor: not-allowed;
}

.weather-display {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.current-weather {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid #e9ecef;
}

.weather-info {
  flex: 1;
}

.weather-info p {
  margin: 8px 0;
  font-size: 1.05em;
}

.forecast {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}

.forecast-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
  transition: transform 0.2s;
}

.forecast-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.forecast-info {
  margin-top: 10px;
}

.forecast-info p {
  margin: 5px 0;
  font-size: 0.95em;
}

.forecast-time {
  color: #6c757d;
  font-size: 0.85em !important;
}

.weather-help {
  text-align: center;
  padding: 30px;
  color: #6c757d;
  font-style: italic;
}

@media (max-width: 768px) {
  .time-display {
    flex-direction: column;
    gap: 10px;
  }

  .location-selector {
    flex-direction: column;
    align-items: stretch;
  }

  .forecast {
    grid-template-columns: 1fr;
  }
}
</style>