<script>
import axios from 'axios';

export default {
  name: 'GetAllBookAPI',
  data() {
    return {
      jsondata: null,
      error: null,
    };
  },
  async mounted() {
    await this.loadAllBooks();
  },
  methods: {
    async loadAllBooks() {
      try {
        const url = 'https://getallbooks-y7juewmqkq-uc.a.run.app';
        const res = await axios.get(url);
        this.jsondata = res.data;   
        this.error = null;
      } catch (e) {
        console.error('loadAllBooks error:', e);
        this.error = e?.message || String(e);
      }
    }
  }
};
</script>

<template>
  <pre v-if="jsondata">{{ jsondata }}</pre>
  <pre v-else-if="error">Error: {{ error }}</pre>
  <pre v-else>Loading…</pre>
</template>
