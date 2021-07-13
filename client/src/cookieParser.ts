const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
  )
export default getCookieValue

// getCookieValue('token')
// localStorage.getItem('login')