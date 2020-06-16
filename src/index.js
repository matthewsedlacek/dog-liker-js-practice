const DOGS_URL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
const mainPage = document.querySelector('main')
const createNewDog = document.querySelector('form')


document.addEventListener('submit', function(event) {
  event.preventDefault()

  
  let name = event.target.name.value
  event.target.name.value = ''

  let breed = event.target.breed.value
  event.target.breed.value = ''

  let image = event.target.image.value
  event.target.image.value = ''

  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "applicaiton/json"
    },
    body: JSON.stringify({"likes": 0, "name": name, "breed": breed, "image": image, "comments": []})
  }
    fetch(DOGS_URL, configObject)
    .then(response => response.json())
    .then(json => buildDogCard(json))
})

function fetchDogs() {
  fetch(DOGS_URL)
  .then(response => response.json())
  .then(json => {
    json.forEach(dog =>{
      buildDogCard(dog)
      })
    })
  }

function buildDogCard(dog) {
  let newDog = document.createElement('div')
  newDog.id = dog.id

  let name = document.createElement('h2')
  name.innerText = dog.name

  let breed = document.createElement('p')
  breed.innerText = dog.breed

  let image = document.createElement('img')
  image.src = dog.image

  let likes = document.createElement('p')
  likes.innerText = dog.likes
  likes.id = `likes_${dog.id}`

  let commentForm = document.createElement('FORM')
  commentForm.id = `commentfor_${dog.id}`

  let commentItem = document.createElement('input')
  commentItem.type = 'text'
  commentItem.name = 'comment'

  let commentBtn = document.createElement('input')
  commentBtn.type = 'submit'
  commentBtn.value = 'submit'

  commentForm.appendChild(commentItem)
  commentForm.appendChild(commentBtn)

  commentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    // let brandNewComment = commentItem.innerText
    // console.log(brandNewComment)

  })


  let commentHeader = document.createElement('p')
  commentHeader.innerText = 'Comments:'

  let commentList = document.createElement('ul')

  let comments = dog.comments.forEach(comment => {
      let commentText = document.createElement('li')
      commentText.innerText = comment
      commentList.appendChild(commentText)
  })

  let likeButton = document.createElement('button')
  likeButton.innerText = 'Like Me'
  likeButton.addEventListener('click', () => {
      increaseLikes(dog)
  })

  let superLikeButton = document.createElement('button')
  superLikeButton.innerText = 'Super Like'
  superLikeButton.addEventListener('click', () => {
    increaseLikesBy10(dog)
  })

  newDog.appendChild(name)
  newDog.appendChild(breed)
  newDog.appendChild(image)
  newDog.appendChild(likes)
  newDog.appendChild(commentList)
  newDog.appendChild(commentForm)
  newDog.appendChild(likeButton)
  newDog.appendChild(superLikeButton)

  mainPage.appendChild(newDog)

}

function increaseLikes(dog) {
  const likeAmount = document.getElementById(`likes_${dog.id}`)
  console.log(likeAmount)
  let numLikes = parseInt(likeAmount.innerText)
  console.log(numLikes)
  numLikes++
  console.log(numLikes)

  let configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "applicaiton/json",
      Accept: "application/json"
    },
    body: JSON.stringify({"likes": numLikes})
  }
    fetch(`${DOGS_URL}/${dog.id}`, configObject)
      .then(response => response.json())
      // .then(json => console.log(json))
      .then(json => (likeAmount.innerText = json.likes))
}

      function increaseLikes(dog) {
        const dogLikes = document.getElementById(`likes_${dog.id}`)
        let numberOfLikes = parseInt(dogLikes.innerText)
        numberOfLikes++
        let configObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({"likes": numberOfLikes})
        }
            fetch(`${DOGS_URL}/${dog.id}`, configObject)
            .then(response => response.json())
            .then( json => (dogLikes.innerText = json.likes))
     }

     function increaseLikesBy10(dog) {
      const dogLikes = document.getElementById(`likes_${dog.id}`)
      let numLikes = parseInt(dogLikes.innerText)
      numLikes += 10

      let configObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({"likes": numLikes})
      }
        fetch(`${DOGS_URL}/${dog.id}`, configObject)
        .then(response => response.json())
        .then(json => (dogLikes.innerText = json.likes))
     }

  



fetchDogs();


})