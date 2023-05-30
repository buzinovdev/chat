<script setup>
import {useChatStore} from "@/stores/chat";
import {useAuthStore} from "@/stores/auth";
import {computed} from "vue";

const chatStore = useChatStore()
const authStore = useAuthStore()
const user = computed(() => authStore.getUser)
</script>

<template>
  <div class="d-flex h-100 justify-content-center align-items-center">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <i class="bi bi-chat-right-text fs-1"></i>
      <span class="my-1">Выберите чат или</span>
      <button class="btn btn-primary" @click="chatStore.selectingNewChat = true">создайте новый</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>
