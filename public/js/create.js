document.getElementById("ebutt").onclick=()=>{
    document.body.classList.add("entering")
    setTimeout(() => {
    window.location.href = "/domain"
    }, 1000)
}
// when coming back via browser back/forward, the page can get
// restored from cache with the glitch class still stuck on it so to prevent that
window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
        document.body.classList.remove("entering")
    }
})
//some necessary constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")
const genButt = document.getElementById("genButt")
const density = document.getElementById("density")
const complexity = document.getElementById("complexity")
const scale = document.getElementById("scale")
const seedVal = document.getElementById("seed")
const rButt = document.getElementById("rButt")
//for now ill do cosmos only
function cosmos() {
    //extracting de values within the function cuz y not
    const densityValue = Number(density.value)
    const complexityValue = Number(complexity.value)
    const scaleValue = Number(scale.value)
    const seed = Number(seedVal.value)
    //stoopid canva stuff 
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for(let i = 0; i < densityValue * 10; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * (scaleValue / 10) + 1
        ctx.fillStyle =  `rgba(255,255,255,${Math.random()})`
        ctx.beginPath()
        ctx.arc(x,y,size,0,Math.PI * 2)
        ctx.fill()
    }
}
genButt.addEventListener("click", ()=>{
    cosmos()
})
rButt.addEventListener("click", ()=>{
    const newSeed = Math.floor(Math.random() * 999999)
    seedVal.value = newSeed
})