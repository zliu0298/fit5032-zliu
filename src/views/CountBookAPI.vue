<script>
import axios from 'axios'

export default {
  data() {
    return { jsondata: null, error: null }
  },
  mounted() {
    this.getBookCountAPI()
  },
  methods: {
    async getBookCountAPI() {
      try {
        const { data } = await axios.get('https://countbooks-y7juewmqkq-uc.a.run.app') // 你的云函数URL
        this.jsondata = JSON.stringify(data, null, 2)
        this.error = null
      } catch (e) {
        console.error('Error fetching book count:', e)
        this.error = e?.message || 'fetch failed'
        this.jsondata = null
      }
    },
  },
}
</script>

<template>
  <pre v-if="jsondata">{{ jsondata }}</pre>
  <p v-else-if="error" class="text-danger">{{ error }}</p>
  <p v-else>Loading…</p>
</template>
