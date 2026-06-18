import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("users", () => {
  const currentUser = ref("Guest");
  const isLoggedIn = ref(false);

  function login(username) {
    currentUser.value = username;
    isLoggedIn.value = true;
  }

  function logout() {
    currentUser.value = "Guest";
    isLoggedIn.value = false;
  }

  return {
    currentUser,
    isLoggedIn,
    login,
    logout,
  };
});
