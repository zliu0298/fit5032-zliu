<script>
// import { error } from 'firebase-functions/logger';
// import { count } from 'firebase/firestore';
import axios from 'axios';

export default {
    data() {
        return {
            jsondata: null,
            error: null,
        };
    },
    mounted() {
        this.getBookCountAPI();
    },
    methods: {
        async getBookCountAPI() {
            try {
                const response = await axios.get('https://countbooks-y7juewmqkq-uc.a.run.app');
                this.jsondata = response.data;
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
    <pre>{{ jsondata }}</pre>
</template>