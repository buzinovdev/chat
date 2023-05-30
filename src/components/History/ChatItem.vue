<script setup>
import UserCircle from "@/components/UserCircle.vue"
import {useAuthStore} from "@/stores/auth";
import {computed} from "vue";

const props = defineProps({
  companion: {type: Object, required: true},
  msg: {type: Object, required: true}
})
const store = useAuthStore()
const user = computed(() => store.getUser)
const sender = computed(() => props.msg.uid === user.value._id ? user.value : props.companion)
const msgColor = computed(() => props.msg.uid === user.value._id ? 'bg-primary text-white' : 'bg-light')
</script>

<template>
  <div class="d-flex w-100 justify-content-center">
    <div class="badge bg-secondary">
      <slot></slot>
    </div>
  </div>
  <div class="chat-item">
    <UserCircle class="d-flex align-self-center me-3" :tag="sender.name" :color="sender.color"/>
    <div class="w-100">
      <div class="d-flex justify-content-between px-1">
        <span class="fw-bold">{{ sender.name }}</span>
        <span class="small text-end">{{ $msgTime(props.msg.created) }}</span>
      </div>
      <p class="p-3 rounded-3 mt-1" :class="msgColor">{{ props.msg.msg }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  &-item {
    display: flex;
    width: 100%;
    margin-bottom: 24px;
  }
}
</style>
