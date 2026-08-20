document.getElementById("ebutt").onclick = () => {
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
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")
const genButt = document.getElementById("genButt")
const density = document.getElementById("density")
const complexity = document.getElementById("complexity")
const scale = document.getElementById("scale")
const seedVal = document.getElementById("seed")
const rButt = document.getElementById("rButt")
const sysSelect = document.getElementById("sysSelect")
function random(seed) {
    let x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
}

sysSelect.addEventListener("change", (e) => {
    const selVal = e.target.value
    if (selVal === "cosmic") {
        console.log("cosmos selected")
    }
    else if (selVal === "fractal") {
        const fracType = document.getElementById("fracType")
        const background = document.getElementById("backName")
        document.getElementById("cosmoh").style.display = "none"
        const color = document.getElementById("col")
        function findCol() {
            return color.value
        }
        console.log("fractal selected")
        function fractal() {
            function findBack() {
                return background.value
            }
            ctx.fillStyle = findBack()
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.strokeStyle = findCol()
            cX = canvas.width / 2
            cY = canvas.height / 2
            drawTree(cX, canvas.height-50, 130, -Math.PI / 2, 10);

        }
        function drawTree(x,y,length,angle,branchWidth) {
            const complex = 11 - document.getElementById("complex").value/10
            if (length<complex) {
                return
            }
            const angChange = Number(document.getElementById("angle").value)/100
            ctx.beginPath()
            ctx.moveTo(x,y)
            const x2 = x + length * Math.cos(angle)
            const y2 = y + length * Math.sin(angle)
            ctx.lineTo(x2,y2)
            ctx.stroke()
            drawTree(x2, y2, length*0.75,angle+angChange,branchWidth*0.7)
            drawTree(x2, y2, length*0.75,angle-angChange,branchWidth*0.7)
        }
        genButt.addEventListener("click", () => {

            fractal()
        })

    }
})
rButt.addEventListener("click", () => {
    const newSeed = Math.floor(Math.random() * 999999)
    seedVal.value = newSeed
})