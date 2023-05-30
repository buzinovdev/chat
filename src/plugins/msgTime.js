const msgTime = {
  install(app) {
    const twoDigits = (num) => {
      return ('0' + num).slice(-2);
    }
    app.config.globalProperties.$msgTime = function (date) {
      const msgTime = new Date(Date.parse(date))
      const currentTime = new Date()
      const sendDate = `${twoDigits(msgTime.getDate())}.${twoDigits(msgTime.getMonth() + 1)}.${msgTime.getFullYear()}`
      const sendTime = `${twoDigits(msgTime.getHours())}:${twoDigits(msgTime.getMinutes())}`
      const firstData = msgTime
      const secondData = currentTime
      const fullDate = firstData.setHours(0, 0, 0, 0) < secondData.setHours(0, 0, 0, 0) ? sendDate + ' ' : ''
      return fullDate + sendTime
    }
  }
}
export default msgTime
