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
    // ... keep other methods the same until getWeather ...

    getWeather() {
      if (!this.selectedLocation) return

      this.isLoading = true
      try {
        const now = Date.now()

        // Get current weather using the actual FFXIV algorithm
        this.currentWeather = {
          name: this.calculateWeather(this.selectedLocation, now),
          timestamp: now
        }

        // Generate forecast for next 5 weather cycles (8 ET hours each)
        this.weatherForecast = Array.from({ length: 5 }, (_, i) => {
          const forecastTime = now + (i + 1) * WEATHER_CONFIG.WEATHER_CYCLE_DURATION
          return {
            name: this.calculateWeather(this.selectedLocation, forecastTime),
            timestamp: forecastTime
          }
        })
      } catch (error) {
        console.error('Error getting weather:', error)
      } finally {
        this.isLoading = false
      }
    },

    // Actual FFXIV weather calculation algorithm
    calculateWeather(location, timestamp) {
      const rates = WEATHER_CONFIG.WEATHER_RATES[this.getMappedLocation(location)]
      if (!rates) return 'Unknown'

      // Calculate weather seed based on timestamp
      timestamp = Math.abs(timestamp || Date.now())
      const bell = Math.floor(timestamp / (WEATHER_CONFIG.EORZEAN_TIME_RATIO * 1000))
      const increment = (Math.floor(bell / 8) * 8 + 8) % 24
      const totalDays = Math.floor(timestamp / (WEATHER_CONFIG.EORZEAN_TIME_RATIO * 1000 * 24))
      const calcBase = totalDays * 100 + increment
      const step1 = (calcBase << 11) ^ calcBase
      const step2 = (step1 >>> 8) ^ step1
      const weatherSeed = step2 % 100

      // Find the matching weather based on seed
      for (let i = 0; ; i++) {
        const rateIndex = 2 * i + 1
        if (rateIndex >= rates.length) break
        if (weatherSeed < rates[rateIndex]) {
          return rates[2 * i]
        }
      }
      return rates[rates.length - 1]
    },

    // Helper to get mapped location name
    getMappedLocation(location) {
      return WEATHER_CONFIG.LOCATION_MAPPING[location] || location
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