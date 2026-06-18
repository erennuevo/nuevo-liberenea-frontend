<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore.js";

const userStore = useUserStore();
const { currentUser, isLoggedIn } = storeToRefs(userStore);
const { login, logout } = userStore;

const username = ref("");

const handleLogin = () => {
  login(username.value);
  username.value = "";
};
</script>

<template>
  <header class="app-header">
    <nav class="page-nav">
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/stats">Stats</RouterLink>

      <div class="auth-section">
        <template v-if="!isLoggedIn">
          <input
            v-model="username"
            class="login-input"
            placeholder="Input a user"
            @keyup.enter="handleLogin"
          />
          <button class="auth-btn login-btn" @click="handleLogin">Login</button>
        </template>

        <template v-else>
          <span class="user-welcome"
            >Welcome, <strong>{{ currentUser }}</strong></span
          >
          <button class="auth-btn login-btn" @click="logout">Logout</button>
        </template>
      </div>
    </nav>
  </header>
</template>

<style>
.app-header {
  margin-bottom: 24px;
}
.page-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #73c8ed;
  padding: 8px;
  border-radius: 8px;
  position: relative;
  z-index: 10;
}

.page-nav a {
  color: #2d3748;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.page-nav a:hover {
  background: rgba(255, 255, 255, 0.5);
  color: #1a202c;
}

.page-nav a.router-link-exact-active {
  color: #ffffff;
  background: rgb(56, 150, 213);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.auth-section {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 8px;
}

.login-input {
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #ffffff;
  padding: 6px 12px;
  border-radius: 6px;
  color: #2d3748;
  font-weight: 500;
  outline: none;
  transition: border-color 0.2s;
}

.login-input:focus {
  border-color: rgb(56, 150, 213);
}

.auth-btn {
  border: none;
  padding: 6px 16px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.login-btn {
  background-color: rgb(56, 150, 213);
  color: #ffffff;
}

.login-btn:hover {
  background-color: rgb(46, 130, 193);
}

.user-welcome {
  color: #2d3748;
  font-size: 0.95rem;
  font-weight: 500;
}
</style>
