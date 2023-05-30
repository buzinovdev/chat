<script setup>
const emit = defineEmits(["send"])
import {ref, computed, watch} from "vue";
import {useRoute} from "vue-router"
import {useChatStore} from "@/stores/chat";
import {useAuthStore} from "@/stores/auth";
import {io} from "socket.io-client";

const route = useRoute()
const chatStore = useChatStore()
const inputValue = ref('')
const inputLength = ref(0)
const sendHandler = () => {
  const data = {
    chatId: route.query?.chat,
    msg: inputValue.value.innerText.trim()
  }
  chatStore.sendMessage({...data})
  inputValue.value.innerText = ''
  inputLength.value = 0
  inputValue.value.focus()
  emit('send', true)
}
const typing = ref(false)
const write = () => {
  inputLength.value = inputValue.value.innerText.trim().length
}
const authStore = useAuthStore()
const user = computed(() => authStore.getUser)


const socket = io('http://localhost:3000');
watch(inputLength, (newValue, oldValue) => {
  inputLength.value > 0 ? socket.emit('typing', user.value._id) : socket.emit('stopTyping')
})

socket.on("typing", (id) => {
  if (route.query?.chat === id) {
    typing.value = true;
  }
});

socket.on("stopTyping", () => {
  typing.value = false;
});
</script>

<template>
  <div class="d-flex position-relative justify-content-start align-items-center mt-4">
    <button class="btn fs-4 me-2"><i class="bi bi-paperclip"></i></button>
    <div class="chat-typing" v-if="typing">Собеседник печатает...</div>
    <div
        class="chat-input border border-primary rounded-2 w-100 text-muted d-flex justify-content-start align-items-center">
      <div ref="inputValue" class="fake-input" contenteditable="true" @input="write"></div>
      <div class="fake-placeholder" v-show="inputLength === 0" @click="inputValue.focus()" @input="typing">Напишите
        сообщение...
      </div>
      <button class="emoji-btn mx-3"><i class="bi bi-emoji-smile"></i></button>
    </div>
    <button
        class="btn btn-primary fs-5 ms-2"
        :disabled="inputLength === 0" @click="sendHandler">
      <i class="bi bi-send"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  &-typing {
    font-size: 14px;
    position: absolute;
    top: -24px;
    left: 60px;
    color: #6c757d;
  }

  &-input {
    position: relative;
  }

  &-btn {
    border: none;
    background-color: transparent;
  }
}

.emoji-btn {
  border: none;
  background-color: transparent;
}

.fake {
  &-input {
    outline: none;
    min-height: 36px;
    width: 100%;
    resize: none;
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 12px;
    padding: 9px 106px 10px 13px;
    word-wrap: break-word;
    box-sizing: border-box;
    border: 0;
    transition: border-bottom-color .3s linear;
  }

  &-placeholder {
    position: absolute;
    top: 50%;
    left: 14px;
    font-size: 14px;
    transform: translateY(-50%);
    line-height: 0;
  }
}
</style>
