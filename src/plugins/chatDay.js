const chatDay = {
  install(app) {
    const twoDigits = (num) => {
      return ('0' + num).slice(-2);
    }
    app.config.globalProperties.$chatDay = function (current, previous) {
      let time
      const today = new Date()
      current = new Date(Date.parse(current.created))
      if (!previous) {
        time = `${twoDigits(current.getDate())}.${twoDigits(current.getMonth() + 1)}.${current.getFullYear()}`
      } else {
        previous = new Date(Date.parse(previous.created))
        if (current.setHours(0, 0, 0, 0) > previous.setHours(0, 0, 0, 0)) {
          time = `${twoDigits(previous.getDate() + 1)}.${twoDigits(previous.getMonth() + 1)}.${previous.getFullYear()}`
        }
        if ((today.setHours(0, 0, 0, 0) !== previous.setHours(0, 0, 0, 0)) &&
          current.setHours(0, 0, 0, 0) > previous.setHours(0, 0, 0, 0) &&
          today.setHours(0, 0, 0, 0) - 86400000 === current.setHours(0, 0, 0, 0)) {
          time = 'Вчера'
        }
        if ((today.setHours(0, 0, 0, 0) !== previous.setHours(0, 0, 0, 0)) &&
          today.setHours(0, 0, 0, 0) === current.setHours(0, 0, 0, 0)) {
          time = 'Сегодня'
        }
      }
      return time
    }
  }
}
export default chatDay
