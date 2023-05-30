document.addEventListener("DOMContentLoaded", () => {
    loadRetreaters()
})

function loadRetreaters() {
    fetch("http://localhost:3000/retreaters")
    .then(response => response.json())
    .then(retreaters => {
        displayRetreatersNav(retreaters)
        displayRetreatersMain(retreaters)
    })
}

function displayRetreatersNav(retreaters) {
    let navUl = document.querySelector("#nav-ul")
    retreaters.forEach(retreater => {
        let li =
        `<li>
            <a class="nav-link" href="#${retreater.name}">${retreater.name}</a>
        </li>`
        navUl.innerHTML += li
    })
}

function displayRetreatersMain(retreaters) {
    let mainDoc = document.querySelector("#main-doc")
    retreaters.forEach(retreater => {
        let mainSection = 
        `<section class="main-section" id="${retreater.name}">
            <header>${retreater.name}</header>
            <iframe width="560" height="315" src="${retreater.youtubeLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <article>
            ${retreater.essayTitle}
            <p>${retreater.essayBody}</p>
            </article>
        </section>`
        mainDoc.innerHTML += mainSection
    })
}