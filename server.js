const express = require("express")
const app = express()
const PORT = 3000
//telling express that our pages will be ejs instead of html
app.set("view engine", "ejs")
//this makes folder accesible to the browser
app.use(express.static("public"))
//testing first req or route
app.get("/",(req, res)=>{
    res.send("INVARA is alive.")
})
app.listen(PORT, ()=>{
    console.log(`INVARA running at http://localhost:${PORT}`)
})