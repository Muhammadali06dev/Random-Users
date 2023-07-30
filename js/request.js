// api
const API = 'https://randomuser.me/api/?results=9'

// for leader
const overlay = document.getElementById('overlay')

// promise request
const toggleLoader = (toggle) => {
   if (toggle) {
      overlay.classList.remove("hidden")
   } else {
      overlay.classList.add("hidden")
   }
}

const getData = (resource) => {

   return new Promise((resolve, reject) => {

      const request = new XMLHttpRequest()

      request.open("get", resource)
      request.send()

      request.addEventListener("readystatechange", () => {
         if (request.readyState < 4) {
            toggleLoader(true)
         } else if (request.readyState == 4 && request.status == 200) {
            const data = JSON.parse(request.responseText)
            resolve(data.results)
            toggleLoader(false)
            clearBtn.classList.remove("hidden")

         } else if (request.readyState == 4) {
            reject("File not found :(")
         }
      })
   })
}

const reload = () => {
   getData(API)
      .then((data) => {
         updateUI(data)
      })
      .catch((err) => {
         console.log(err)
      })

}

document.addEventListener("DOMContentLoaded", reload)
