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
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    let currentSeed = seed
    //lezz add colors
    const colors = [
        [255, 80, 80],
        [80, 140, 255],
        [255, 220, 80],
        [255, 150, 50],
        [240, 240, 255]
    ]
    //lezz make em actually starry
    //this is for adding another dimension (specifying distance from the observer)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const star = densityVal * 10
    //lets add nebula cloud stuff
    const nebulaCount = Math.floor(complexityVal / 10) + 2

for (let i = 0; i < nebulaCount; i++) {

    currentSeed++
    const nebulaX = random(currentSeed) * canvas.width

    currentSeed++
    const nebulaY = random(currentSeed) * canvas.height

    currentSeed++
    const nebulaSize = random(currentSeed) * (scaleVal * 3) + 100

    currentSeed++
    const colorIndex = Math.floor(random(currentSeed) * colors.length)

    const color = colors[colorIndex]

    const blobCount = 3 + Math.floor(complexityVal / 15)

    for (let j = 0; j < blobCount; j++) {

        currentSeed++

        const offsetX =
            (random(currentSeed) - 0.5) * nebulaSize

        currentSeed++

        const offsetY =
            (random(currentSeed) - 0.5) * nebulaSize

        currentSeed++

        const blobSize =
            nebulaSize * (0.4 + random(currentSeed) * 0.7)

        const gradient = ctx.createRadialGradient(
            nebulaX + offsetX,
            nebulaY + offsetY,
            0,
            nebulaX + offsetX,
            nebulaY + offsetY,
            blobSize
        )

        gradient.addColorStop(
            0,
            `rgba(${color[0]},${color[1]},${color[2]},0.12)`
        )

        gradient.addColorStop(
            0.5,
            `rgba(${color[0]},${color[1]},${color[2]},0.04)`
        )

        gradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
        )

        ctx.fillStyle = gradient

        ctx.beginPath()

        ctx.arc(
            nebulaX + offsetX,
            nebulaY + offsetY,
            blobSize,
            0,
            Math.PI * 2
        )

        ctx.fill()
    }
}
    for(let i = 0; i<star; i++) {
        currentSeed++
        const randomX = random(currentSeed)
        currentSeed++
        const randomY = random(currentSeed)
        currentSeed++
        const randomSize = random(currentSeed)
        currentSeed++;
        const randomOpacity = random(currentSeed);
        currentSeed++
        const colorIndex = Math.floor( 
            random(currentSeed) * colors.length
        )
        const color = colors[colorIndex]
        // const x = randomX * canvas.width
        // const y = randomY * canvas.height
        //making use of the complexity
        const ComplexityEff = complexityVal
        let x = randomX * canvas.width
        let y = randomY * canvas.height
        // const randomOffsetX = (randomX - 0.5) * canvas.width
        // const randomOffsetY = (randomY - 0.5) * canvas.height
        // const x = centerX + randomOffsetX * (1 - complexityVal / 120)
        // const y = centerY + randomOffsetY * (1 - complexityVal / 120) things didnt go as planned
        const size =
        Math.pow(randomSize, 2) *
        (scaleVal / 3) +
        0.5
        let finalSize = size
        const points = 4 + Math.floor(complexityVal/20)
        const innerSize = size * 0.25
        const opacity = randomOpacity * 0.8 + 0.2
        // ctx.fillStyle = `rgba(255,255,255,${opacity})`
        // lets add a bit of colors
        // const colorShift = Math.floor(randomOpacity * 100);
        // ctx.fillStyle = `rgba(${200 + colorShift}, ${220 + colorShift}, 255, ${opacity})`
        // ctx.beginPath()
        // ctx.arc(
        //     x,
        //     y,
        //     size,
        //     0,
        //     Math.PI * 2
        // )
        // ctx.fill() keeping deez just in case i fuk up
        // const gradient = ctx.createRadialGradient(
        //     x,
        //     y,
        //     0,
        //     x,
        //     y,
        //     size * 4
        // )
        // gradient.addColorStop(
        //     0,
        //     `rgba(255,255,255,${opacity})`
        // )
        // gradient.addColorStop(
        // 1,
        // "rgba(255,255,255,0)"
        // )
        // ctx.fillStyle = gradient
        // ctx.beginPath()
        // ctx.arc(
        //     x,
        //     y,
        //     size * 4,
        //     0,
        //     Math.PI * 2
        // )
        // ctx.fill() ts was horrendus
        // const voidChance = randomX > 0.35 && randomX < 0.55 && randomY > 0.35 && randomY < 0.55
        // if (voidChance && complexityVal > 40) {
        // continue
        // }
        ctx.fillStyle =
        `rgba(${color[0]},${color[1]},${color[2]},${opacity})`
        ctx.beginPath()
        for (let j = 0; j < points * 2; j++) {
            const angle = (Math.PI * j) / points
            const radius = j % 2 === 0 ? size : finalSize * 0.25
            const starX = x + Math.cos(angle) * radius
            const starY = y + Math.sin(angle) * radius
            if( j === 0) {
                ctx.moveTo(starX, starY)
            }
            else {
                ctx.lineTo(starX, starY)
            }
        }
        ctx.closePath()
        ctx.fill()

    }
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