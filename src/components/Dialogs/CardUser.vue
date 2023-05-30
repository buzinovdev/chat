<script setup>
import {useRoute, useRouter} from "vue-router"
import UserCircle from "@/components/UserCircle.vue"
import {useChatStore} from "@/stores/chat";

const chatStore = useChatStore()
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
const route = useRoute()
const router = useRouter()

const startСhat = () => {
  chatStore.selectingNewChat = false
  router.push(`${route.path}?chat=${props.user._id}`)
}
</script>

<template>
  <li class="p-2 border-bottom d-flex align-items-center pointer-event"
      role="button"
      :title="`Начать чат с ${props.user.name}`"
      @click="startСhat">
    <UserCircle class="d-flex align-self-center me-3" :tag="props.user.name" :color="props.user.color"/>
    <div class="fw-bold mb-0">{{ props.user.name }}</div>
  </li>
</template>

<style scoped>

</style>
