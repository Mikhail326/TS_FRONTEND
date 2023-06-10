// -------------  Timer ---------------
const day = document.querySelector('#day')
const hour = document.querySelector('#hour')
const minute = document.querySelector('#minute')
const second = document.querySelector('#second')

const dateFinishTimer = new Date(`27 Jul 2023 00:00:00`)

const func = () => {
  const todayDay = Date.now()
  let gap = dateFinishTimer - todayDay
  let d = Math.floor(gap / 1000 / 60 / 60 / 24)
  let h = Math.floor((gap / 1000 / 60 / 60) % 24)
  let m = Math.floor((gap / 1000 / 60) % 60)
  let s = Math.floor((gap / 1000) % 60)

  day.innerHTML = d < 10 ? "0" + d : d
  hour.innerHTML = h < 10 ? "0" + h : h
  minute.innerHTML = m < 10 ? "0" + m : m
  second.innerHTML = s < 10 ? "0" + s : s
}
setInterval(func, 1000)

// --------- Form -------------
const form = document.querySelector('#form')
const input = document.querySelector('#email')
const popup = document.querySelector('.popup')
const closeBtns = document.querySelectorAll('.close')
const error = document.querySelector('.error')

const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const submitForm = async (e) => {
  e.preventDefault()
  const data = new FormData(form)
  if(!input.value) {
    error.classList.add('active-error')
    error.innerHTML = 'Required field!'
    return
  }
  if (!input.value.match(regEx)) {
    error.classList.add('active-error')
    error.innerHTML = 'Enter the email in the correct format!'
    return
  } else {
    error.classList.remove('active-error')
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data
      })
      if (res.ok) {
        popup.classList.add('active-popup')
        input.value = ''
      }
    } catch (e) {
      console.log(e)
    }
  }
}

const closePopup = () => {
  popup.classList.remove('active-popup')
}

form.addEventListener('submit', submitForm)
closeBtns.forEach(b => {
  b.addEventListener('click', closePopup)
})