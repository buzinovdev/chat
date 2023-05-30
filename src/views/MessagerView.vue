<script setup lang="ts">
import Dialogs from "@/components/Dialogs/Dialogs.vue";
import History from "@/components/History/Main.vue";
import UserPanel from "@/components/User/UserPanel.vue";

import {useAuthStore} from "@/stores/auth";
import {useChatStore} from "@/stores/chat";

const authStore = useAuthStore()
const chatStore = useChatStore()
const user = computed(() => authStore.getUser)
const activeChats = computed(() => chatStore.activeChatsList)
import {io} from 'socket.io-client';
import {computed, onBeforeMount} from "vue";

onBeforeMount(() => {
  if (chatStore.activeChatsList.length === 0) chatStore.getActiveChats()
})

const socket = io('http://localhost:3000');
socket.on('message', (message) => {
  if (message.chatId === user.value._id) {
    message.unread = message.uid
    chatStore.appendMessage(message)
  }
});
</script>

<template>
  <section>
    <div class="container-xxl p-3">
      <UserPanel/>
      <div class="card content-block">
        <div class="card-body">
          <div class="d-flex gap-5">
            <Dialogs/>
            <History/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-block {
  max-height: 660px;
}
</style>
