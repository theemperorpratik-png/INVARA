const cOpt = document.getElementById("cOpt")
const eOpt = document.getElementById("eOpt")
const aOpt = document.getElementById("aOpt")
cOpt.addEventListener("click", ()=>{
    document.body.classList.add("entering")
    setTimeout(() => {
    window.location.href = "/create"
    }, 1000)
})
// when coming back via browser back/forward, the page can get
// restored from cache with the glitch class still stuck on it so to prevent that
window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
        document.body.classList.remove("entering")
    }
})
eOpt.addEventListener("click", ()=>{
    console.log("EXPLORE AHH CLICKED")
})
aOpt.addEventListener("click", ()=>{
    console.log("ARCHIVE AHH CLICKED")
})