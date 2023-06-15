document.addEventListener("DOMContentLoaded", () => {
    loadPoems()
    createPoem()
})

function loadPoems() {
    fetch("http://localhost:3000/poems")
    .then(response => response.json())
    .then(poems => {
        displayPoemsNav(poems)
        displayPoemsMain(poems)
    })
}

function displayPoemsNav(poems) {
    let navUl = document.querySelector("#nav-ul")
    poems.forEach(poem => {
        let li =
        `<li>
            <a class="nav-link" href="#${poem.title}">${poem.title}</a>
            <p>${poem.author}<span>${poem.year}</span></p>
        </li>`
        navUl.innerHTML += li
    })
}

function displayPoemsMain(poems) {
    let mainDoc = document.querySelector("#main-doc")
    poems.forEach(poem => {
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
            </article>
        </section>`
        mainDoc.innerHTML += mainSection
    })
}

function createPoem() {
    
}