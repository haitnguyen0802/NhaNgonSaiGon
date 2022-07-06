//Test Height

// window.addEventListener("scroll", function () {
//   console.log(this.window.pageYOffset);
// });

// Height Header
let heightHeader = document.querySelector(".header");
const mainWrapper = document.querySelector(".mainwrapper");
window.addEventListener("scroll", function (event) {
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
  if (this.window.pageYOffset > 200 && this.window.pageYOffset < 300) {
    if (heightHeader.classList.contains("ani_BottomtoTop")) {
      heightHeader.classList.remove("ani_BottomtoTop");
    }
  }
});
// $(document).ready(function () {
//   let heightHeader = $(".header");
//   $(window).scroll(function () {
//     if ($(window).scrollTop() > 500) {
//       heightHeader.slideDown(300);
//     } else {
//       heightHeader.slideUp(200);
//     }
//   });
// });

// var header = $(".header");
// function setHeaderClass(isScroll) {
//   if (isScroll) {
//     header.addClass("activeHeader");
//   } else {
//     header.removeClass("activeHeader");
//   }
// }
// $(function () {
//   let pageY = 0;
//   let prevY = 0;
//   $(window).on("scroll load resize", function () {
//     prevY = pageY;
//     pageY = $(this).scrollTop();
//     if (pageY === 0) {
//       setHeaderClass(false);
//     } else if (pageY - prevY < 0) {
//       setHeaderClass(true);
//     } else if (pageY - prevY > 0) {
//       setHeaderClass(true);
//     }
//   });
// });
// let heightHeader = $(".header");
// const mainWrapper = $(".mainwrapper");

// $(document).ready(function () {
//   $("body").on("scroll", function () {
//     let heightPage = $(this).document.offset();
//     if (heightPage >= 200) {
//       mainWrapper.addClass("active");
//       heightHeader.addClass("active");
//     } else {
//       mainWrapper.removeClass("active");
//       heightHeader.removeClass("active", "ani_BottomtoTop");
//     }
//     if (heightPage >= 600) {
//       heightHeader.addClass("active", "ani_ToptoBottom");
//     } else {
//       heightHeader.classList.replace("ani_ToptoBottom", "ani_BottomtoTop");
//     }
//     if (heightPage > 200 && heightPage < 550) {
//       if (heightHeader.contains("ani_BottomtoTop")) {
//         heightHeader.removeClass("ani_BottomtoTop");
//       }
//     }
//   });
// });

//Btn Menu Header & Stop stopPropagation
let menuBtn = document.querySelector(".header .header__btnmenu");
let mainMenu = document.querySelector(".header .container .nav");

menuBtn.addEventListener("click", function (event) {
  menuBtn.classList.toggle("active");
  mainMenu.classList.toggle("active");

  mainMenu.addEventListener("wheel", function (e_scroll) {
    e_scroll.preventDefault();
    e_scroll.stopPropagation();
  });

  mainMenu.addEventListener("touchmove", function (e_touchs) {
    e_touchs.preventDefault();
    e_touchs.stopPropagation();
  });
});

// Resize mainMenu
window.addEventListener("resize", function (event) {
  if (this.window.innerWidth > 414) {
    if (mainMenu.classList.contains("active")) {
      menuBtn.classList.remove("active");
      mainMenu.classList.remove("active");
    }
  }
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

// Move To Page & Active Page || Remove Active Page
let btnMenu = document.querySelectorAll(".header .header__menu ul li a");
let activeMenu = document.querySelectorAll(".header .header__menu ul li ");
let sections = [];

function removeClass() {
  activeMenu.forEach(function (element, index) {
    element.classList.remove("active");
  });
}

activeMenu.forEach(function (element, index) {
  element.addEventListener("click", function (e) {
    removeClass();
    element.classList.add("active");
  });
});

btnMenu.forEach(function (element, index) {
  let link = element.getAttribute("href");
  let className = link.replace("#", "");
  let section = document.querySelector("." + className);
  sections.push(section);

  element.addEventListener("click", function (e) {
    e.preventDefault();
    let positionofSection = section.offsetTop - 70;
    window.scrollTo({
      top: positionofSection,
      behavior: "smooth",
    });
  });
});

window.addEventListener("scroll", function (e) {
  let positionofSection = this.window.pageYOffset;
  sections.forEach(function (element, index) {
    if (positionofSection > element.offsetTop - 75) {
      removeClass();
      activeMenu[index].classList.add("active");
    } else {
      activeMenu[index].classList.remove("active");
    }
  });
});
