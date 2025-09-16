<!-- <template>
  <div>
    <h1>Add Book</h1>
  </div>
</template>

<script setup>
</script> -->
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

      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '@/firebase/init'   
import { collection, addDoc } from 'firebase/firestore'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    const docRef = await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value,
    })

    console.log('Book added with ID: ', docRef.id)
    alert('Book added successfully!')

    isbn.value = ''
    name.value = ''
  } catch (error) {
    console.error('Error adding book: ', error)
    alert('Failed: ' + error.message)
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>
