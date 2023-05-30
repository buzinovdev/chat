import {defineStore} from "pinia";
import {computed, ref} from 'vue'
import axios from "axios";
import router from '@/router';


export const useAuthStore = defineStore('auth', () => {
  const auth = ref<boolean>(false)
  const login = async (userData) => {
    await axios
      .post('http://localhost:3000/user/login', {userData})
      .then(res => {
        if (res.data?.status === 400) {
          alert(res.data.msg)
        } else {
          localStorage.setItem('user', JSON.stringify(res.data.user))
          localStorage.setItem('token', JSON.stringify(res.data.token))
          router.push('/messager')
        }
      })
  }
  const isAuth = computed(() => {
    const checkUser = JSON.parse(localStorage.getItem('token')) || ''
    return !!checkUser.username?.length > 0
  }) as Boolean

  const logout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/')
    }
  }

  const getUser = computed(() => JSON.parse(localStorage.getItem('user')))
  return {auth, isAuth, login, logout, getUser}
})
