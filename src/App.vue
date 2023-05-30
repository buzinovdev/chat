<script setup lang="ts">
import {ref, computed, onBeforeMount} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from "@/stores/auth";

const router = useRouter()
const authStore = useAuthStore()
const startApp = () => {
  const route = authStore.isAuth ? '/messager' : '/'
  router.push(route)
}
onBeforeMount(() => {
  //startApp()
})
</script>

<template>
  <RouterView/>
</template>

<style scoped>

</style>
