//Test Height
window.addEventListener("scroll", function () {
  console.log(this.scrollY);
});

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
  if (this.window.innerWidth <= 414) {
    if (this.window.pageYOffset >= 400) {
      heightHeader.classList.add("active", "ani_ToptoBottom");
    } else {
      heightHeader.classList.replace("ani_ToptoBottom", "ani_BottomtoTop");
    }
  } else if (this.window.innerWidth > 414) {
    if (this.window.pageYOffset >= 600) {
      heightHeader.classList.add("active", "ani_ToptoBottom");
    } else {
      heightHeader.classList.replace("ani_ToptoBottom", "ani_BottomtoTop");
    }
  }
  if (this.window.pageYOffset > 200 && this.window.pageYOffset < 500) {
    if (heightHeader.classList.contains("ani_BottomtoTop")) {
      heightHeader.classList.remove("ani_BottomtoTop");
    }
  }
});

// Banner 
document.addEventListener('DOMContentLoaded', function () {
  var dots = document.querySelectorAll('.custom-dots .dot');
  var elem = document.querySelector('.banner-carousel');

  if (elem) {
    var flkty = new Flickity(elem, {
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
      autoPlay: 5000,
      pauseAutoPlayOnHover: false,
      prevNextButtons: false,
      pageDots: false,
      draggable: true
    });

    if (dots.length > 0) {
      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          var index = parseInt(this.getAttribute('data-index'));
          flkty.select(index);
        });
      });

      flkty.on('change', function (index) {
        dots.forEach(function (dot) {
          dot.classList.remove('active');
        });

        dots[index].classList.add('active');
      });
    }

    var prevButton = document.querySelector('.banner-nav--prev');
    var nextButton = document.querySelector('.banner-nav--next');
    
    if (prevButton) {
      prevButton.addEventListener('click', function () {
        flkty.previous();
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', function () {
        flkty.next();
      });
    }
  }
});

//Btn Menu Header & Stop stopPropagation
let menuBtn = document.querySelector(".header .header__btnmenu");
let mainMenu = document.querySelector(".header .nav");

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
// Move To Page & Active Page || Remove Active Page
let btnMenu = document.querySelectorAll(".header .header__menu ul li a");
let activeMenu = document.querySelectorAll(".header .header__menu ul li ");
let sections = [];

function removeClass() {
  activeMenu.forEach(function (element, index) {
    element.classList.remove("active");
  });
}

function toggleDropdown(event) {
  const dotsMenuIcon = document.querySelector('.dots-menu-icon');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (dotsMenuIcon && dropdownMenu) {
    dotsMenuIcon.classList.toggle('active');

    if (dotsMenuIcon.classList.contains('active')) {
      dropdownMenu.style.display = 'block';
    } else {
      dropdownMenu.style.display = 'none';
    }

    event.stopPropagation();
  }
}

document.addEventListener('click', function (event) {
  const dotsMenuIcon = document.querySelector('.dots-menu-icon');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (dotsMenuIcon && dropdownMenu) {
    if (!dotsMenuIcon.contains(event.target) && dotsMenuIcon.classList.contains('active')) {
      dotsMenuIcon.classList.remove('active');
      dropdownMenu.style.display = 'none';
    }
  }
});

activeMenu.forEach(function (element, index) {
  element.addEventListener("click", function (e) {
    removeClass();
    element.classList.add("active");
  });
});

btnMenu.forEach(function (element, index) {
  let link = element.getAttribute("href");
  if (link && link.startsWith("#")) {
    let className = link.replace("#", "");
    let section = document.querySelector("." + className);
    if (section) {
      sections.push({
        element: section,
        menuItem: activeMenu[index]
      });

      element.addEventListener("click", function (e) {
        e.preventDefault();
        let positionofSection = section.offsetTop - 70;
        window.scrollTo({
          top: positionofSection,
          behavior: "smooth",
        });
      });
    }
  }
});

if (sections.length > 0) {
  window.addEventListener("scroll", function (e) {
    let positionofSection = this.window.pageYOffset;
    sections.forEach(function (item) {
      if (positionofSection > item.element.offsetTop - 75 &&
        positionofSection < item.element.offsetTop + item.element.offsetHeight) {
        removeClass();
        item.menuItem.classList.add("active");
      }
    });
  });
}

// Nav Navigation
let navMenu = document.querySelectorAll(".header .nav ul li a");
const mainNav = document.querySelector(".header nav");
const closeBtn = document.querySelector(".header .header__btnmenu");
let sectionsNav = [];

navMenu.forEach(function (element, index) {
  let link = element.getAttribute("href");
  if (link && link.startsWith("#")) {
    let className = link.replace("#", "");
    let sectionNav = document.querySelector("." + className);
    if (sectionNav) {
      sectionsNav.push(sectionNav);

      element.addEventListener("click", function (event) {
        event.preventDefault();

        if (mainNav) mainNav.classList.remove("active");
        if (closeBtn) closeBtn.classList.remove("active");

        let positionofNav = sectionNav.offsetTop - 65;
        window.scrollTo({
          top: positionofNav,
          behavior: "smooth",
        });
      });
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

// Property Detail Gallery Carousel
document.addEventListener('DOMContentLoaded', function() {
  // Find the gallery elements
  const propertyGallery = document.querySelector('.propertydetail__gallery-carousel');
  const thumbnails = document.querySelectorAll('.thumbnail-item');
  
  // Only initialize if the gallery exists
  if (propertyGallery && propertyGallery.querySelectorAll('.carousel-cell').length > 0) {
    try {
      // Initialize with proper options
      const flktyOptions = {
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
        prevNextButtons: true,
        pageDots: true,
        adaptiveHeight: false,
        draggable: true,
        autoPlay: false
      };
      
      const flkty = new Flickity(propertyGallery, flktyOptions);
      
      // Handle thumbnails if they exist
      if (thumbnails && thumbnails.length > 0) {
        thumbnails.forEach(function(thumbnail, index) {
          thumbnail.addEventListener('click', function() {
            if (flkty && typeof flkty.select === 'function') {
              flkty.select(index);
            }
            // Update active class
            thumbnails.forEach(function(thumb) {
              thumb.classList.remove('active');
            });
            thumbnail.classList.add('active');
          });
        });
        
        // Set initial active thumbnail
        if (thumbnails[0]) {
          thumbnails[0].classList.add('active');
        }
        
        // Update thumbnails when slide changes
        flkty.on('change', function(index) {
          thumbnails.forEach(function(thumb) {
            thumb.classList.remove('active');
          });
          if (thumbnails[index]) {
            thumbnails[index].classList.add('active');
          }
        });
      }
      
      // Make sure Flickity is properly initialized
      flkty.resize();
    } catch (error) {
      console.error('Error initializing Flickity:', error);
    }
  }
  
  // Handle wishlist buttons
  const wishlistButtons = document.querySelectorAll('.btn-wishlist');
  if (wishlistButtons && wishlistButtons.length > 0) {
    wishlistButtons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
      });
    });
  }
});
