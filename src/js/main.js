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

// ---------- Animate library --------------
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 100, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1200, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});


//------ Scroll anchor ------------
const secondSection = document.querySelector('.second-section')
const btnScroll = document.querySelector('.link-anchor')

const scrollTo = () => {
  btnScroll.classList.add('active-anchor')
  window.scroll({
    left: 0,
    top: secondSection.offsetTop,
    behavior: 'smooth',
  })
}

btnScroll.addEventListener('click', scrollTo)