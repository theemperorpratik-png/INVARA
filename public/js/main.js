const page = document.getElementById("page")
const enterButton = document.getElementById("ebutt")
//ts event listner is for animation
enterButton.addEventListener("click",()=>{
    document.body.classList.add("entering")
    setTimeout(() => {
    window.location.href = "/domain"
    }, 1000)
})
// when coming back via browser back/forward, the page can get
// restored from cache with the glitch class still stuck on it
window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
        document.body.classList.remove("entering")
    }
})