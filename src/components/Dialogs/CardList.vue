<script setup>
import CardItem from "@/components/Dialogs/CardItem.vue";
import CardUser from "@/components/Dialogs/CardUser.vue";
import {useChatStore} from "@/stores/chat";
import {useAuthStore} from "@/stores/auth";
import {computed, onBeforeMount, watch} from "vue";

const chatStore = useChatStore()
const authStore = useAuthStore()
const activeChats = computed(() => chatStore.activeChatsList)
const userList = computed(() => chatStore.userList.filter(el => el._id !== authStore.getUser._id))
const selectingNewChat = computed(() => chatStore.selectingNewChat)
onBeforeMount(() => {
  chatStore.getUsers()
  userList
})
</script>

<template>
  <ul style="position: relative; height: 400px; overflow-y: scroll" class="list-unstyled mb-0">
    <CardItem :chat="item" v-for="item in activeChats" :key="item._id"
              v-if="selectingNewChat === false"/>
    <CardUser :user="item" v-for="item in userList" :key="item._id" v-else/>
  </ul>
</template>

<style scoped>

</style>
