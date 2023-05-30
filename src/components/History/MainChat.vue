<script setup>
import {computed, onBeforeMount, ref} from "vue";
import {useChatStore} from "@/stores/chat";
import {useRoute} from "vue-router"
import ChatInput from "@/components/History/ChatInput.vue";
import ChatItem from "@/components/History/ChatItem.vue";
import BottomBtn from "@/components/History/BottomBtn.vue";

const chatStore = useChatStore()
const route = useRoute()
const activeChat = computed(() => chatStore.activeChatsList.find(el => el.chatId === route.query.chat))
const list = ref(null)

const mountedScrollChat = () => {
  const container = list.value
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}
const showBottomBtn = ref(false)
const scrollChat = () => {
  const container = list.value
  if (container.scrollTop + container.offsetHeight < container.scrollHeight - 30) {
    showBottomBtn.value = true
  } else {
    showBottomBtn.value = false
  }
}

onBeforeMount(() => {
  const interval = setInterval(() => {
    if (activeChat.value?.msgs.length > 0) {
      mountedScrollChat()
      clearInterval(interval);
    }
  }, 100);
})
</script>

<template>
  <div class="chat" v-if="activeChat?.msgs">
    <router-link class="chat-return" to="/messager"><i class="bi bi-arrow-left-short"></i> закрыть</router-link>
    <div class="chat-list" ref="list" @scroll="scrollChat">
      <ChatItem
          :companion="{uid: activeChat.chatId,name: activeChat.name,color: activeChat.color}"
          :msg="item" v-for="(item, idx) in activeChat?.msgs" :key="idx">
        {{ $chatDay(item, activeChat.msgs[idx - 1]) }}
      </ChatItem>
      <BottomBtn @click="mountedScrollChat" v-show="showBottomBtn"/>
    </div>
  </div>
  <div v-else>Пусто</div>
  <ChatInput @send="mountedScrollChat"/>
</template>

<style lang="scss" scoped>

.chat {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 550px;

  &-return {
    position: absolute;
    top: 0;
  }

  &-list {
    margin-top: 30px;
    overflow-y: scroll;
    padding-right: 20px;
  }
}
</style>
