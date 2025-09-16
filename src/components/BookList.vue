<template>
  <div>
    <h2>Books with ISBN > 1000</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button class="btn btn-sm btn-warning ms-2" @click="updateBook(book)">Update</button>
        <button class="btn btn-sm btn-danger ms-2" @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>

    <h2 class="mt-4">Books Ordered by Name</h2>
    <ul>
      <li v-for="book in booksByName" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>

    <h2 class="mt-4">First 5 Books</h2>
    <ul>
      <li v-for="book in booksLimited" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/init'
import { collection, query, where, orderBy, limit, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'

const books = ref([])
const booksByName = ref([])
const booksLimited = ref([])

// fetch book: ISBN > 1000 
const fetchBooks = async () => {
  const q = query(collection(db, 'books'), where('isbn', '>', 1000))
  const snapshot = await getDocs(q)
  books.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

// Books Ordered by Name
const fetchBooksByName = async () => {
  const q = query(collection(db, 'books'), orderBy('name'))
  const snapshot = await getDocs(q)
  booksByName.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

// fetch and limit the number of books
const fetchBooksLimited = async () => {
  const q = query(collection(db, 'books'), limit(5))
  const snapshot = await getDocs(q)
  booksLimited.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

// update book
const updateBook = async (book) => {
  const newName = prompt("Enter new book name:", book.name)
  if (!newName) return
  const bookRef = doc(db, 'books', book.id)
  await updateDoc(bookRef, { name: newName })
  alert("Book updated!")
  fetchBooks()
  fetchBooksByName()
  fetchBooksLimited()
}

// delete book
const deleteBook = async (id) => {
  if (!confirm("Are you sure you want to delete this book?")) return
  await deleteDoc(doc(db, 'books', id))
  alert("Book deleted!")
  fetchBooks()
  fetchBooksByName()
  fetchBooksLimited()
}

onMounted(() => {
  fetchBooks()
  fetchBooksByName()
  fetchBooksLimited()
})
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>
