

const weather = document.querySelector('form')
const search = document.querySelector('input')
weather.addEventListener('submit', (event) => {
  event.preventDefault();
  const loco = search.value;
  find(loco)

})


let find = (loc) => {
  fetch(`http://localhost:3000/weather?address=${loc}`)
  .then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data);
      }
    })
  })

}