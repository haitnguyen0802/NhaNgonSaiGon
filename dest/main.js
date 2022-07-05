//Height Header
let heightHeader = document.querySelector(".header");
const mainWrapper = document.querySelector(".mainwrapper");
window.addEventListener("scroll", function (event) {
  console.log(this.window.pageYOffset);
  if (this.window.pageYOffset >= 200) {
    mainWrapper.classList.add("active");
    heightHeader.classList.add("active");
  } else {
    mainWrapper.classList.remove("active");
    heightHeader.classList.remove("active", "ani_BottomtoTop");
  }
  if (this.window.pageYOffset >= 600) {
    heightHeader.classList.add("active", "ani_ToptoBottom");
  } else {
    heightHeader.classList.replace("ani_ToptoBottom", "ani_BottomtoTop");
  }
  if (this.window.pageYOffset > 200 && this.window.pageYOffset < 400) {
    if (heightHeader.classList.contains("ani_BottomtoTop")) {
      heightHeader.classList.remove("ani_BottomtoTop");
    }
  }
});
//Btn Menu Header
let menuBtn = document.querySelector(".header .header__btnmenu");
let mainMenu = document.querySelector(".header .container .nav");

menuBtn.addEventListener("click", function (element) {
  menuBtn.classList.toggle("active");
  mainMenu.classList.toggle("active");
});

//Hiw Selected
let itemHiw = document.querySelectorAll(".hiw .hiw__items .hiw__items-block");
currentSelected = 0;
itemHiw.forEach(function (element, index) {
  if (element.classList.contains("active")) {
    currentSelected = index;
  }
  element.addEventListener("click", function (event) {
    itemHiw[currentSelected].classList.remove("active");
    itemHiw[index].classList.add("active");

    currentSelected = index;
  });
});
