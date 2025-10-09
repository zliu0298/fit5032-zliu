<script>
// import { error } from 'firebase-functions/logger';
// import { count } from 'firebase/firestore';
import axios from 'axios';

export default {
    data() {
        return {
            count: null,
            error: null,
        };
    },
    methods: {
        async getBookCount() {
            try {
                const response = await axios.get('https://us-central1-week7-zihan.cloudfunctions.net/countBooks');
                this.count = response.data.count;
                this.error = null;
            } catch (error) {
                console.error('Error fetching book count:', error);
                this.error = error;
                this.count = null;
            }
        },
    },
};

</script>

<template>
    <div id="app">
        <h1>Book Counter</h1>
        <button @click="getBookCount">Get Book Count</button>
        <p v-if="count !== null">Total number of books: {{ count }}</p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>