<script setup lang="ts">
import axios from "axios";
import {computed, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from "@/stores/auth";

const router = useRouter()
const authStore = useAuthStore()
const login = ref('')
const username = ref('')
const name = ref('')
const loginHandler = async () => {
  await authStore.login({login: login.value.toLowerCase()})
}
const registrationHandler = async () => {
  const color = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
  await authStore.login({login: username.value.toLowerCase(), name: name.value,color})
}
</script>

<template>
  <div class="login">
    <h1 class="login-title mb-4">Войти или зарегистрироваться</h1>
    <div class="d-flex justify-content-around gap-5 align-items-center">
      <form @submit.prevent>
        <div class="mb-3">
          <input type="text" class="login-input form-control" v-model="login" placeholder="Логин">
          <div class="valid-feedback invalid-feedback">
            Please choose a username.
          </div>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary" @click="loginHandler">Войти</button>
        </div>
      </form>
      <form @submit.prevent>
        <div class="mb-3">
          <input type="text" class="login-input form-control" v-model="username" placeholder="Логин">
        </div>
        <div class="mb-3">
          <input type="text" class="login-input form-control" v-model="name" placeholder="Как вас зовут?">
          <div class="valid-feedback invalid-feedback">
            Please choose a username.
          </div>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary" @click="registrationHandler">Зарегистрироваться</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &-title {
    font-weight: 700;
    font-size: 4rem;
  }

  &-input {
    width: 320px;

    &::placeholder {
      font-size: 14px;
    }
  }
}
</style>
