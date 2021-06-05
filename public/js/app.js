const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')
const m3 = document.querySelector('#m3')

const weather = document.querySelector('form')
const search = document.querySelector('input')
weather.addEventListener('submit', (event) => {
  event.preventDefault();
  const loco = search.value;
  
  find(loco)

})


let find = (loc) => {
  m1.textContent = 'Loading....'
  m2.textContent = ''
  m3.textContent = ''
  //fetching the data from the localhost
  fetch(`/weather?address=${loc}`)
  .then((response) => {
    response.json().then(function(data) {
      if (data.error) {
        m1.textContent = data.error
      } else {
        m1.textContent = `Location: ${data.address}`
        m2.textContent = `Forecast: ${data.foreCast}`
        m3.textContent = `Temperature is ${data.temperature} degrees but feels like ${data.feels} degrees`
      }
    })
  })
}
