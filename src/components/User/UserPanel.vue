<script setup>
import {computed} from 'vue'
import {useAuthStore} from "@/stores/auth";
import UserCircle from "@/components/UserCircle.vue";
import Logout from "@/components/User/Logout.vue";

const authStore = useAuthStore()
const userData = computed(() => {
  return authStore.getUser
})
</script>

<template>
  <div class="card d-flex flex-row align-items-center justify-content-between py-2 px-3 mb-3">
    <span class="fs-1 fw-bold">Чатик</span>
    <div class="d-flex align-items-center justify-content-end">
      <UserCircle :tag="userData.name[0].toUpperCase()" :color="userData.color"/>
      <span class="ms-2 fs-5 fw-bold d-inline-block">{{ userData.name }}</span>
      <Logout/>
    </div>
  </div>
</template>

<style scoped>

</style>
