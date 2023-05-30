<script setup>
import {useAuthStore} from "@/stores/auth";
const authStore = useAuthStore()
</script>

<template>
  <button class="btn btn-danger ms-5 d-flex align-items-center" @click="authStore.logout()">Выход<i class="bi bi-door-closed fs-5 ms-2"></i></button>
</template>


<style scoped>

</style>
