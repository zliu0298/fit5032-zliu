<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>
  </div>

  <main>
    <div v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <span>{{ weatherData.weather[0].description }}</span>
    </div>
  </main>
</template>

<script>
import axios from "axios"

// ⚠️ 课堂作业可以直接写；更规范做法是放到 .env 里（可以后再做）
const apikey = "cfbfd5a9938a62162c003a1cf4caa51c"

export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
    }
  },
  computed: {
    // 直接让 openweather 返回摄氏度（见下方 URL 的 units=metric），这里无需再 -273
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : null
    },
    // 新的图标地址 + https
    iconUrl() {
      if (!this.weatherData) return null
      const icon = this.weatherData.weather[0].icon
      return `https://openweathermap.org/img/wn/${icon}@2x.png`
    },
  },
  mounted() {
    // 打开页面时先尝试定位
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
