<script setup>
import {computed, ref, watch} from "vue";
import {useRoute} from "vue-router"
import UserCircle from "@/components/UserCircle.vue"
import {io} from "socket.io-client";
const route = useRoute()
const props = defineProps({
  chat: {type: Object, required: true}
})
const unreadHandler = computed(() => props.chat.msgs.filter(el => el.unread === props.chat.chatId)?.length)
const typing = ref(false)
const cutMsg = (str) => {
  str = props.chat.lastMsg.uid !== props.chat.chatId ? `Вы: ${str}` : str
  const n = 28
  if (str.length > n) {
    return str.substr(0, n - 1) + '...'
  } else {
    return str
  }
}
const socket = io('http://localhost:3000');
socket.on("typing", (id) => {
  if (props.chat.chatId === id) {
    typing.value = true;
  }
});
socket.on("stopTyping", () => {
  typing.value = false;
});
</script>

<template>
  <li class="p-2 border-bottom" :class="{'active-chat': route.query?.chat === props.chat.chatId}">
    <router-link :to="`${route.path}?chat=${props.chat.chatId}`" class="d-flex gap-3">
      <UserCircle class="d-flex align-self-center" :tag="props.chat.name" :color="props.chat.color"/>
      <div class="w-100">
        <div class="d-flex align-items-center justify-content-between gap-1">
          <div class="fw-bold mb-0">{{ props.chat.name }}</div>
          <div class="small text-muted">{{ $msgTime(props.chat.lastMsg.created) }}</div>
        </div>

        <div class="pt-1 position-relative">
          <p class="small text-muted" v-if="typing">Собеседник печатает...</p>
          <p class="small text-muted " v-else>{{ cutMsg(props.chat.lastMsg.msg) }}</p>
          <span class="unread badge bg-danger rounded-pill float-end" v-if="unreadHandler > 0">
            {{ unreadHandler }}
          </span>
        </div>
      </div>
    </router-link>
  </li>
</template>

<style scoped>
.active-chat {
  background-color: #eee;
}

.unread {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
}
</style>
