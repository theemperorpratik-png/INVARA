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
//random seed thrower
function random(seed) {
        let x = Math.sin(seed++) * 10000
        return x - Math.floor(x)
    }
//now comes the main fractal function
function fractal() {
    ctx.fillStyle = "red"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "white"
    centerX = canvas.width/2
    centerY = canvas.height/2
    branch(
    canvas.width / 2,
    canvas.height,
    150,
    -Math.PI / 2,
    Math.floor(Number(complexity.value)/10)
)

}
function branch(x, y, length, angle, depth) {

    if (depth <= 0) {
        return
    }

    // calculate where this branch ends
    const endX = x + Math.cos(angle) * length
    const endY = y + Math.sin(angle) * length

    // draw branch
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(endX, endY)
    ctx.stroke()

    // create smaller branches
        branch(endX, endY, length * 0.7, angle - 0.5, depth - 1)
        branch(endX, endY, length * 0.7, angle + 0.5, depth - 1)
    
}
genButt.addEventListener("click", ()=>{
    
    fractal()
})
rButt.addEventListener("click", ()=>{
    const newSeed = Math.floor(Math.random() * 999999)
    seedVal.value = newSeed
})