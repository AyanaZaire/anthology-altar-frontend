document.addEventListener("DOMContentLoaded", () => {
    loadPoems()
    let poemForm = document.getElementById('poem-form') 
    poemForm.addEventListener("submit", (event) => {
        poemFormHandler(event)
    })
})

function loadPoems() {
    fetch("http://localhost:3000/poems")
    .then(response => response.json())
    .then(poems => {
        poems.forEach(poem => {
            displayPoem(poem)
        })
    })
}

function displayPoem(poem) {
    // display in nav
    let navUl = document.querySelector("#nav-ul")
    // poems.forEach(poem => {
        let li =
        `<li>
            <a class="nav-link" href="#${poem.title}">${poem.title}</a>
            <p>${poem.author}<span>${poem.year}</span></p>
        </li>`
        navUl.innerHTML += li
    // })

    // display in main doc
    let mainDoc = document.querySelector("#main-doc")
    // poems.forEach(poem => {
        if (youtubeVideo != "") {
            var youtubeVideo = `<iframe width="560" height="315" src="${poem.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        }
        let mainSection = 
        `<section class="main-section" id="${poem.title}">
            <header>${poem.title}</header>
            <img src="${poem.image}" class="poet-image"/>
            ${youtubeVideo}
            <article>
            <p class="author">${poem.author}</p>
            <p class="year">${poem.year}</p>
            <p>${poem.poem}</p>
            <div class="flex-container">
                <div class="flex-child">
                    <p class="citation">Citation</p>
                </div>
                <div class="flex-child">
                    <p class="citation-text">${poem.author}.<i>${poem.title}</i>.${poem.publisher}, ${poem.year}</p>
                </div>
            </div>
            </article>
        </section>`
        mainDoc.innerHTML += mainSection
    // })
}

// called inside DOMContentLoaded event listener 
function poemFormHandler(event) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    let inputTitle = document.getElementById('title').value
    let inputAuthor = document.getElementById('author').value
    let inputPoem = document.getElementById('poem').value
    let inputSource = document.getElementById('source').value
    let inputBook = document.getElementById('book').value
    let inputPublisher = document.getElementById('publisher').value
    let inputYear = document.getElementById('year').value
    let inputImage = document.getElementById('image').value
    let inputVideo = document.getElementById('video').value
    console.log(inputAuthor)
    createPoem(inputTitle, inputAuthor, inputPoem, inputSource, inputBook, inputPublisher, inputYear, inputImage, inputVideo)
    return false;
}

function createPoem(inputTitle, inputAuthor, inputPoem, inputSource, inputBook, inputPublisher, inputYear, inputImage, inputVideo) {
    fetch('http://localhost:3000/poems', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        title: inputTitle, 
        author: inputAuthor, 
        poem: inputPoem, 
        source: inputSource, 
        book: inputBook, 
        publisher: inputPublisher, 
        year: inputYear, 
        image: inputImage, 
        video: inputVideo
    })
  })
  .then(response => response.json())
  .then(json => {
      if(!json.error) {
        console.log(json)
        displayPoem(json)
      } else {
        alert(json.error.message)
      }
  })
}