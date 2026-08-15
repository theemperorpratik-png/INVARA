const express = require("express")
const app = express()
const PORT = 3000
//telling express that our pages will be ejs instead of html
app.set("view engine", "ejs")
//this makes folder accesible to the browser
app.use(express.static("public"))
app.get("/",(req, res)=>{
    res.render("index")
})
app.get("/domain", (req,res)=>{
    res.render("domain")
})
app.listen(PORT, ()=>{
    console.log(`INVARA running at http://localhost:${PORT}`)
})