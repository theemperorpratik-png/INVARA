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
//for now ill do cosmos only
//redoinf cosmos for the seed concept hahhhhhhhhh
function cosmos() {
    //extracting dem values
    const densityVal = Number(density.value);
    const complexityVal = Number(complexity.value)
    const scaleVal = Number(scale.value)
    const seed = Number(seedVal.value)
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height)
    let currentSeed = seed
    const star = densityVal * 10
    for(let i = 0; i<star; i++) {
        currentSeed++
        const randomX = random(currentSeed)
        currentSeed++
        const randomY = random(currentSeed)
        currentSeed++
        const randomSize = random(currentSeed)
        currentSeed++;
        const randomOpacity = random(currentSeed);
        // const x = randomX * canvas.width
        // const y = randomY * canvas.height
        //making use of the complexity
        const ComplexityEff = complexityVal
        const x = randomX * canvas.width + Math.sin(i * ComplexityEff) * 50
        const y = randomY * canvas.height + Math.sin(i * ComplexityEff) * 50
        const size = randomSize * (scaleVal/10) + 1
        const opacity = randomOpacity * 0.8 + 0.2
        // ctx.fillStyle = `rgba(255,255,255,${opacity})`
        // lets add a bit of colors
        const colorShift = Math.floor(randomOpacity * 100);
        ctx.fillStyle = `rgba(${200 + colorShift}, ${220 + colorShift}, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(
            x,
            y,
            size,
            0,
            Math.PI * 2
        )
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