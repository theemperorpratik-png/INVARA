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
const it = document.getElementById("it")
const zoom = document.getElementById("zoom")
const xPos = document.getElementById("xPos")
const yPos = document.getElementById("yPos")

const itVal = document.getElementById("itVal")
const zoomVal = document.getElementById("zoomVal")
const xVal = document.getElementById("xVal")
const yVal = document.getElementById("yVal")
it.addEventListener("input", (e) => {
    itVal.textContent = e.target.value
})

zoom.addEventListener("input", (e) => {
    zoomVal.textContent = e.target.value
})

xPos.addEventListener("input", (e) => {
    xVal.textContent = e.target.value
})

yPos.addEventListener("input", (e) => {
    yVal.textContent = e.target.value
})
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
    }
})
document.getElementById("fracType").addEventListener("change",(e)=>{
    
    if(e.target.value == "fracTree"){
        document.querySelector(".set").style.display = "none"
        document.querySelector(".tree").style.display = "block"
    } else if(e.target.value == "set") {
        document.querySelector(".set").style.display = "block"
        document.querySelector(".tree").style.display = "none"
    } else if(e.target.value == "koch") {
        document.querySelector(".set").style.display = "none"
        document.querySelector(".tree").style.display = "none"
    }
})

genButt.addEventListener("click", () => {

    if (sysSelect.value === "fractal") {
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
            // ctx.fillStyle = "white"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.strokeStyle = findCol()
            cX = canvas.width / 2
            cY = canvas.height / 2

            if (document.getElementById("fracType").value == "fracTree") {
                drawTree(cX, canvas.height - 50, 130, -Math.PI / 2, 10);
            } else if (document.getElementById("fracType").value == "set") {
                draw()
            } else if (document.getElementById("fracType").value == "koch") {
            ctx.fillStyle = "black"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
                function flake(x1,y1,x5,y5,depth) {
                    if(depth===0) {
                        ctx.lineTo(x5, y5);
                        return

                    }
                    const x2 = x1 + (x5 - x1) / 3
                    const y2 = y1 + (y5 - y1) / 3
                    const x4 = x1 + ((x5-x1)*2)/3
                    const y4 = y1 + ((y5-y1)*2)/3
                    const x3 = x2 + (x4-x2)*0.5 - (y4 -y2)* Math.sin(-Math.PI/3)
                    const y3 = y2 + (x4-x2)* Math.sin(-Math.PI/3) + (y4 -y2)*0.5
                    flake(x1, y1, x2, y2, depth - 1);
                    flake(x2, y2, x3, y3, depth - 1);
                    flake(x3, y3, x4, y4, depth - 1);
                    flake(x4, y4, x5, y5, depth - 1);
                }
                // ctx.fillStyle = "white"
                ctx.beginPath();
                ctx.moveTo(300, 100); 
                flake(300, 100, 500, 450, 8); 
                flake(500, 450, 100, 450, 8); 
                flake(100, 450, 300, 100, 8); 
                ctx.stroke();
                
            }

        }
        {
            //code from:https://dev.to/foqc/mandelbrot-set-in-js-480o cuz it involved complex concepts to make on my own in a reasonable time(especially since a lot of time was already wasted in cosmos) but i modified the code according to my liking and made compatible to a few parameters

            function mandelbrot(c) {
                const maxIt = Number(it.value)
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
                } while (d <= 2 && n < maxIt)
                return [n, d <= 2]
            }
            const HEIGHT = canvas.height
            const WIDTH = canvas.width
            // const REAL_SET = { start: -2, end: 1 }
            // const IMAGINARY_SET = { start: -1, end: 1 } modified acc to params
            function colorGenThrughSeed() {
                const seed = Number(seedVal.value)
                const base = Math.floor(random(seed) * 360)
                const colors = ["#000000"]
                for (let i = 1; i < 8; i++) {
                    const firstMap = base + i * 8
                    const saturation =70 + Math.floor(random(seed + i) * 20)
                    const lightness = 25 + i * 8
                    colors.push(
                        `hsl(${firstMap}, ${saturation}%, ${lightness}%)`
                    )
                }

                return colors
            }

            function draw() {
                
                const colors = colorGenThrughSeed()
                let maxIt = Number(it.value)
                const zoomLvl = Number(zoom.value)
                const ceX = Number(xPos.value)
                const ceY = Number(yPos.value)
                const realR = 3 / zoomLvl
                const imaginaryR = 2 / zoomLvl
                const realst = ceX - realR / 2
                const realEnd = ceX + realR / 2
                const imaginarySt = ceY - imaginaryR / 2
                const imaginaryEnd = ceY + imaginaryR / 2
                for (let i = 0; i < WIDTH; i++) {
                    for (let j = 0; j < HEIGHT; j++) {
                        const complex = {
                            x: realst + (i / WIDTH) *
                                (realEnd - realst),

                            y: imaginarySt + (j / HEIGHT) *
                                (imaginaryEnd - imaginarySt)
                        }

                        const [m, isMandelbrotSet] = mandelbrot(complex)
                        ctx.fillStyle = colors[isMandelbrotSet ? 0 : (m % colors.length - 1) + 1]
                        ctx.fillRect(i, j, 1, 1)
                    }
                }
            }
        }
        function drawTree(x, y, length, angle, branchWidth) {
            ctx.lineWidth = branchWidth
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
            drawTree(x2, y2, length * 0.75, angle + angChange, branchWidth * 0.75)
            drawTree(x2, y2, length * 0.75, angle - angChange, branchWidth * 0.75)
        }


        fractal()
    }

})
rButt.addEventListener("click", () => {
    const newSeed = Math.floor(Math.random() * 999999)
    seedVal.value = newSeed
})