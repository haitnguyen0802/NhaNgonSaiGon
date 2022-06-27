//Btn Menu Header
let menuBtn = document.querySelector(".header .header__btnmenu") 
let mainMenu = document.querySelector(".header .container .nav")

menuBtn.addEventListener("click",function(element){
    menuBtn.classList.toggle("active");
    mainMenu.classList.toggle("active");
})

//Hiw Selected
let itemHiw = document.querySelectorAll(".hiw .hiw__items .hiw__items-block")
currentSelected = 0;
itemHiw.forEach(function(element,index){
    if(element.classList.contains("active")){
        currentSelected = index;
    }
    element.addEventListener("click",function(event){
        itemHiw[currentSelected].classList.remove("active");
        itemHiw[index].classList.add("active");

        currentSelected = index;
    })
})