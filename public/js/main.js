const page = document.getElementById("page")
const enterButton = document.getElementById("ebutt")
//ts event listner is for animation
enterButton.addEventListener("click",()=>{
    document.body.classList.add("entering")
    setTimeout(() => {
    window.location.href = "/domain"
    }, 800)
})
