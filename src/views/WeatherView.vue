<template>
  <div class="page">
    <header class="page-header">
      <h1 class="title">WEATHER APP</h1>

      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name, e.g. Clayton, AU"
          class="search-input"
          @keyup.enter="searchByCity"
        />
        <button class="search-button" @click="searchByCity">Search</button>
      </div>
    </header>

    <main class="content">
      <div v-if="weatherData" class="weather-card">
        <div class="weather-left">
          <img :src="iconUrl" alt="Weather Icon" class="icon" />
        </div>

        <div class="weather-right">
          <h2 class="place">
            {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>

          <div class="temp-row">
            <span class="temp">{{ temperature }}°C</span>
            <span class="desc">{{ weatherData.weather[0].description }}</span>
          </div>
        </div>
      </div>

      <p v-else class="placeholder">Type a city and hit Search to see weather.</p>
    </main>
  </div>
</template>

<script>
import axios from "axios"
const apikey = "cfbfd5a9938a62162c003a1cf4caa51c"

export default {
  name: "App",
  data() {
    return {
      city: "Clayton", 
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : null
    },
    iconUrl() {
      if (!this.weatherData) return null
      const icon = this.weatherData.weather[0].icon
      return `https://openweathermap.org/img/wn/${icon}@2x.png`
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude, longitude } = pos.coords
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`
          await this.fetchWeatherData(url)
        })
      }
    },
    async searchByCity() {
      const q = this.city?.trim()
      if (!q) return
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        q
      )}&appid=${apikey}&units=metric`
      await this.fetchWeatherData(url)
    },
    async fetchWeatherData(url) {
      try {
        const { data } = await axios.get(url)
        this.weatherData = data
      } catch (err) {
        console.error("Error fetching weather data:", err)
        this.weatherData = null
      }
    },
  },
}
</script>

<style scoped>
.page {
  max-width: 960px;
  margin: 32px auto;
  padding: 0 20px;
}

.page-header {
  display: grid;
  gap: 16px;
  justify-items: center;
  margin-bottom: 24px;
}

.title {
  font-size: 40px;
  letter-spacing: 2px;
  margin: 0;
}

.search-bar {
  display: flex;
  gap: 12px;
  width: min(600px, 100%);
}

.search-input {
  flex: 1 1 auto;
  padding: 10px 12px;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
}
.search-input:focus {
  border-color: #3b82f6; 
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.search-button {
  padding: 10px 16px;
  border: 0;
  border-radius: 10px;
  background: #1d4ed8;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.search-button:hover {
  background: #1e40af;
}

.content {
  display: grid;
  justify-items: center;
}

.weather-card {
  width: min(720px, 100%);
  background: #fff;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 20px 22px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  gap: 12px;
}

.weather-left {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 96px;
  height: 96px;
}

.place {
  margin: 0 0 8px 0;
  font-size: 28px;
  line-height: 1.2;
}

.temp-row {
  display: flex;
  align-items: baseline;
  gap: 18px;
}

.temp {
  font-size: 44px;
  font-weight: 700;
}

.desc {
  font-size: 16px;
  color: #6b7280; /* gray-500 */
  text-transform: capitalize; /* broken clouds -> Broken clouds */
}

.placeholder {
  color: #6b7280;
}

@media (max-width: 560px) {
  .weather-card {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .place {
    font-size: 24px;
  }
  .temp {
    font-size: 38px;
  }
}
</style>
