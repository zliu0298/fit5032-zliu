<template>
  <div class="container mt-4">
    <h1 class="mb-4">Add Book</h1>

    <form @submit.prevent="addBook">
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN:</label>
        <input
          type="text"
          v-model="isbn"
          id="isbn"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input
          type="text"
          v-model="name"
          id="name"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Submitting...' : 'Add Book' }}
      </button>

      <p class="mt-3" v-if="msg">{{ msg }}</p>
      <p class="mt-1 text-danger" v-if="err">{{ err }}</p>
      <!-- <small class="text-muted">
        Mode: {{ USE_FUNCTIONS ? 'Cloud Functions (for 9.2)' : 'Direct Firestore' }}
      </small> -->
    </form>

    <hr class="my-5" />

    <!-- import BookList -->
    <BookList />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import BookList from '@/components/BookList.vue'

import { db } from '@/firebase/init'
import { collection, addDoc } from 'firebase/firestore'

const FN_URL = 'https://addbookuppercase-y7juewmqkq-uc.a.run.app'
const USE_FUNCTIONS = true 

const isbn = ref('')
const name = ref('')
const loading = ref(false)
const msg = ref('')
const err = ref('')

// add books
const addBook = async () => {
  msg.value = ''
  err.value = ''
  loading.value = true
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      err.value = 'ISBN must be a valid number'
      loading.value = false
      return
    }

    if (USE_FUNCTIONS) {
      const { data } = await axios.post(FN_URL, {
        isbn: isbnNumber,
        name: name.value
      })
      msg.value = `Created by Cloud Function. DocID: ${data.id || '(no id returned)'}`
    } else {
      const docRef = await addDoc(collection(db, 'books'), {
        isbn: isbnNumber,
        name: name.value
      })
      msg.value = `Created directly in Firestore. DocID: ${docRef.id}`
    }

    // clear form
    isbn.value = ''
    name.value = ''
  } catch (e) {
    console.error('Error adding book:', e)
    err.value = `Failed to add book: ${e?.response?.data?.error || e.message}`
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
