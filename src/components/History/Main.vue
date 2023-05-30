<script setup>
import MainStart from "@/components/History/MainStart.vue"
import MainChat from "@/components/History/MainChat.vue"
import {useRoute} from "vue-router"
const route = useRoute()
</script>

<template>
  <div class="history">
    <MainChat v-if="route.query?.chat"/>
    <MainStart v-else/>
  </div>
</template>

<style scoped>
.history {
  width: calc(100% - 320px - 3rem);
}
</style>
