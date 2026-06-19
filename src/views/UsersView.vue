<script setup>
import { ref, computed } from "vue";
import { useFetch } from "../composables/useFetch.js";

const {
  data: users,
  loading,
  error,
} = useFetch("https://jsonplaceholder.typicode.com/users");
</script>

<template>
  <div class="todo-view">
    <RouterLink :to="`/todo`">
      <button class="nav-button">← Go to Todo List</button>
    </RouterLink>

    <h1>📋 User List</h1>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else-if="error" class="error-box">
      {{ error }}
      <button class="retry-button" @click="retry">Retry</button>
    </div>

    <div v-else class="user-grid">
      <div v-for="user in users" :key="user.id" class="user-card">
        <strong class="name">{{ user.name }}</strong>
        <span class="username">@{{ user.username }}</span>
        <span class="email">{{ user.email }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-view {
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
  position: relative;
  z-index: 10;
}

.nav-button {
  background: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 20px;
}

.user-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-card:hover {
  transform: translateY(-2px);
}

.name {
  font-size: 18px;
  color: #1b2a4a;
}

.username {
  font-size: 14px;
  color: #42b883;
  font-weight: 600;
}

.email {
  font-size: 14px;
  color: #6b7280;
}

.loading {
  text-align: center;
  padding: 48px;
  color: #42b883;
}

.error-box {
  background: #fef2f2;
  border: 1px solid #fca5a5;
  padding: 16px;
  color: #dc2626;
  border-radius: 8px;
}
</style>
