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
        document.getElementById("angle").addEventListener("input", (e) => {
            document.getElementById("angleVal").textContent = e.target.value
        })
        document.getElementById("complex").addEventListener("input", (e) => {
            document.getElementById("complexVal").textContent = e.target.value
        })
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
            
            if(document.getElementById("fracType").value=="fracTree") {
                drawTree(cX, canvas.height - 50, 130, -Math.PI / 2, 10);
            }else if(document.getElementById("fracType").value=="set") {
                draw()
            }

        }
        {
            //code from:https://dev.to/foqc/mandelbrot-set-in-js-480o cuz it was too complex to understand and make on my own in a reasonable time i did modify it accourding to my way 
            const MAX_ITERATION = 80
            function mandelbrot(c) {
                let z = { x: 0, y: 0 }, n = 0, p, d;
                do {
                    p = {
                        x: Math.pow(z.x, 2) - Math.pow(z.y, 2),
                        y: 2 * z.x * z.y
                    }
                    z = {
                        x: p.x + c.x,
                        y: p.y + c.y
                    }
                    d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2))
                    n += 1
                } while (d <= 2 && n < MAX_ITERATION)
                return [n, d <= 2]
            }
            const HEIGHT = canvas.height
            const WIDTH = canvas.width
            const REAL_SET = { start: -2, end: 1 }
            const IMAGINARY_SET = { start: -1, end: 1 }

            const colors = new Array(16).fill(0).map((_, i) => i === 0 ? '#000' : `#${((1 << 24) * Math.random() | 0).toString(16)}`)

            function draw() {
                for (let i = 0; i < WIDTH; i++) {
                    for (let j = 0; j < HEIGHT; j++) {
                        complex = {
                            x: REAL_SET.start + (i / WIDTH) * (REAL_SET.end - REAL_SET.start),
                            y: IMAGINARY_SET.start + (j / HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start)
                        }

                        const [m, isMandelbrotSet] = mandelbrot(complex)
                        ctx.fillStyle = colors[isMandelbrotSet ? 0 : (m % colors.length - 1) + 1]
                        ctx.fillRect(i, j, 1, 1)
                    }
                }
            }
        }
        function drawTree(x, y, length, angle, branchWidth) {
            const complex = 5.5 - document.getElementById("complex").value / 20
            if (length < complex) {
                return
            }
            const angChange = Number(document.getElementById("angle").value) / 100

            ctx.beginPath()
            ctx.moveTo(x, y)
            const x2 = x + length * Math.cos(angle)
            const y2 = y + length * Math.sin(angle)
            ctx.lineTo(x2, y2)
            ctx.stroke()
            drawTree(x2, y2, length * 0.75, angle + angChange, branchWidth * 0.7)
            drawTree(x2, y2, length * 0.75, angle - angChange, branchWidth * 0.7)
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