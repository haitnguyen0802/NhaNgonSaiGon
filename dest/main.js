//Btn Menu Header
let menuBtn = document.querySelector(".header .header__btnmenu") 
let mainMenu = document.querySelector(".header .container .nav")
console.log(mainMenu)
menuBtn.addEventListener("click",function(element){
    menuBtn.classList.toggle("active");
    mainMenu.classList.toggle("active");
})