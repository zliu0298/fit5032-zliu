<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase/init'
import { collection, query, where, getDocs } from 'firebase/firestore'

// 保存书籍
const books = ref([])

// 定义异步任务：从 Firestore 查询数据
const fetchBooks = async () => {
  try {
    const q = query(collection(db, 'books'), where('isbn', '>', 1000))
    const querySnapshot = await getDocs(q)
    const booksArray = []

    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })

    books.value = booksArray
  } catch (error) {
    console.error('Error fetching books: ', error)
  }
}

// 在组件挂载时执行
onMounted(() => {
  fetchBooks()
})
</script>
