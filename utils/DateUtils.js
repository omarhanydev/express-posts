const DateUtils = {
  calculateTimeSince(dateRaw) {
    const date = new Date(dateRaw)
    const userTimezoneOffset = date.getTimezoneOffset() * 60000
    const utcDate = new Date(date.getTime() - userTimezoneOffset)
    const currentDate = new Date()
    const seconds = Math.floor((currentDate - utcDate) / 1000)
    let interval = seconds / 31536000

    if (interval > 1) {
      return Math.floor(interval) + ' year(s) ago'
    }
    interval = seconds / 2592000
    if (interval > 1) {
      return Math.floor(interval) + ' month(s) ago'
    }
    interval = seconds / 86400
    if (interval > 1) {
      return Math.floor(interval) + ' day(s) ago'
    }
    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + ' hour(s) ago'
    }
    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + ' minute(s) ago'
    }
    return Math.floor(seconds) + ' second(s) ago'
  },
  calculateUtcDate(dateRaw) {
    const date = new Date(dateRaw)
    const userTimezoneOffset = date.getTimezoneOffset() * 60000
    const utcDate = new Date(date.getTime() + userTimezoneOffset)
    return utcDate
  },
}

module.exports = DateUtils