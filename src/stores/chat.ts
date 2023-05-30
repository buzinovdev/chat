import {defineStore} from "pinia";
import {ref, reactive, computed} from "vue";
import {io} from 'socket.io-client';
import axios from "axios";
import {useAuthStore} from "@/stores/auth";

const socket = io('http://localhost:3000');

export const useChatStore = defineStore('chat', () => {
  const authStore = useAuthStore()
  const selectingNewChat = ref<Boolean>(false)
  const userList = reactive([])
  const activeChatsList = ref([])

  const getUsers = async () => {
    await axios.get('http://localhost:3000/user/get')
      .then(res => {
        if (res.data?.status === 400) {
          alert(res.data.msg)
        } else {
          userList.push(...res.data)
        }
      })
  }
  const getActiveChats = async () => {
    await axios
      .post('http://localhost:3000/message/used', {uid: authStore.getUser._id})
      .then(res => {
        if (res.data?.status === 400) {
          alert(res.data.msg)
        } else {
          activeChatsList.value = res.data
        }
      })
  }
  const createChat = async (chatId: String) => {
    const getUserData = userList.find(el => el._id === chatId)
    activeChatsList.value.push({
      chatId,
      name: getUserData.name,
      color: getUserData.color,
      msgs: [],
      lastMsg: {uid: '', created: '', msg: ''}
    })
  }
  const sendMessage = async ({chatId, msg}) => {
    let findCurrentChat = activeChatsList.value.find(el => el.chatId === chatId)
    const message = {mid: findCurrentChat?.msgs.length + 1 || 1, uid: authStore.getUser._id, created: new Date(), msg}
    const lastMessage = {uid: message.uid, created: message.created, msg: message.msg}
    await axios
      .post('http://localhost:3000/message/send', {uid: authStore.getUser._id, chatId, message})
      .then(res => {
        if (res.data?.status === 400) {
          alert(res.data.msg)
        } else {
          if (!findCurrentChat) {
            createChat(chatId)
            findCurrentChat = activeChatsList.value.find(el => el.chatId === chatId)
          }
          findCurrentChat.msgs.push(message)
          findCurrentChat.lastMsg = lastMessage
          socket.emit('sendMessage', {uid: authStore.getUser._id, chatId, message})
        }
      })
  }
  const appendMessage = async (data) => {
    let findCurrentChat = activeChatsList.value.find(el => el.chatId === data.uid)
    if (!findCurrentChat) {
      createChat(data.uid)
      findCurrentChat = activeChatsList.value.find(el => el.chatId === data.uid)
    }
    findCurrentChat.msgs.push(data.message)
    findCurrentChat.lastMsg = {uid: data.message.uid, created: data.message.created, msg: data.message.msg}
  }
  const typing = () => {
    console.log()
  }
  return {
    selectingNewChat,
    getActiveChats,
    activeChatsList,
    userList,
    sendMessage,
    appendMessage,
    getUsers,
    typing
  }
})
