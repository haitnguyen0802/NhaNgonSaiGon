//Test Height
window.addEventListener("scroll", function () {
  console.log(this.scrollY);
});

// Height Header
let lastScrollPosition = 0;
const header = document.querySelector(".header");
const mainWrapper = document.querySelector(".mainwrapper");

window.addEventListener("scroll", function() {
    const currentScrollPosition = window.pageYOffset;
    const isMobile = window.innerWidth <= 414;
    const showThreshold = 200; // Apply 'active' style past this point
    const hideThreshold = isMobile ? 400 : 600; // Trigger hide/show animations past this point

    // Determine scroll direction
    const scrollingDown = currentScrollPosition > lastScrollPosition;

    // --- Manage `mainWrapper` active state --- (Optional based on your needs)
    if (currentScrollPosition >= showThreshold) {
        mainWrapper.classList.add("active");
    } else {
        mainWrapper.classList.remove("active");
    }

    // --- Manage `header` state --- 
    if (currentScrollPosition < showThreshold) {
        // Near the top: Reset header to default state
        header.classList.remove("active", "ani_ToptoBottom", "ani_BottomtoTop");
    } else {
        // Past the initial threshold: Header is active
        header.classList.add("active");

        if (scrollingDown) {
            // Scrolling DOWN
            if (currentScrollPosition >= hideThreshold) {
                // Hide header smoothly
                header.classList.remove("ani_ToptoBottom");
                header.classList.add("ani_BottomtoTop");
            }
            // Optional: If between showThreshold and hideThreshold while scrolling down,
            // ensure it's visible (ani_ToptoBottom or no animation class)
            // else {
            //     header.classList.remove("ani_BottomtoTop"); 
            // }

        } else {
            // Scrolling UP: Show header smoothly
            header.classList.remove("ani_BottomtoTop");
            header.classList.add("ani_ToptoBottom");
        }
    }

    // Update last scroll position for the next event
    lastScrollPosition = currentScrollPosition <= 0 ? 0 : currentScrollPosition;
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

// Toggle filters on mobile
document.addEventListener('DOMContentLoaded', function() {
  const filterToggle = document.querySelector('.filter-toggle');
  const filterRow = document.querySelector('.filter-row');
  const streetSearch = document.querySelector('.street-search');
  
  if (filterToggle && filterRow && streetSearch) {
    filterToggle.addEventListener('click', function() {
      if (filterRow.style.display === 'flex' || filterRow.style.display === 'block') {
        filterRow.style.display = 'none';
        streetSearch.style.display = 'none';
      } else {
        filterRow.style.display = 'flex';
        streetSearch.style.display = 'block';
      }
    });
  }
});

// Chức năng lọc và tìm kiếm bất động sản
document.addEventListener('DOMContentLoaded', function() {
  // Lấy các phần tử
  const searchForm = document.querySelector('.search-main');
  const searchInput = document.querySelector('.search-input input');
  const searchButton = document.querySelector('.search-button');
  const districtSelect = document.querySelector('select[name="district"]');
  const priceSelect = document.querySelector('select[name="price"]');
  const areaSelect = document.querySelector('select[name="area"]');
  const streetSelect = document.querySelector('select[name="street"]');
  
  // Đăng ký sự kiện khi click nút tìm kiếm
  if (searchButton) {
    searchButton.addEventListener('click', function() {
      performSearch();
    });
  }
  
  // Đăng ký sự kiện khi nhấn Enter trong ô tìm kiếm
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });
  }
  
  // Hàm thực hiện tìm kiếm
  function performSearch() {
    // Thu thập dữ liệu từ các bộ lọc
    const searchParams = {
      keyword: searchInput ? searchInput.value.trim() : '',
      district: districtSelect ? districtSelect.value : '',
      price: priceSelect ? priceSelect.value : '',
      area: areaSelect ? areaSelect.value : '',
      street: streetSelect ? streetSelect.value : ''
    };
    
    // Hiển thị thông tin tìm kiếm (có thể thay bằng AJAX request trong ứng dụng thực tế)
    console.log('Thực hiện tìm kiếm với các tham số:', searchParams);
    
    // Tạo URL cho trang kết quả tìm kiếm
    const queryParams = new URLSearchParams();
    
    // Chỉ thêm các tham số có giá trị
    if (searchParams.keyword) queryParams.append('keyword', searchParams.keyword);
    if (searchParams.district) queryParams.append('district', searchParams.district);
    if (searchParams.price) queryParams.append('price', searchParams.price);
    if (searchParams.area) queryParams.append('area', searchParams.area);
    if (searchParams.street) queryParams.append('street', searchParams.street);
    
    // Trong ứng dụng thực tế, có thể chuyển hướng đến trang kết quả
    const searchResultsUrl = './search-results.html?' + queryParams.toString();
    console.log('URL tìm kiếm:', searchResultsUrl);
    
    // Chuyển hướng đến trang kết quả tìm kiếm (bỏ comment để kích hoạt)
    window.location.href = searchResultsUrl;
    
    // Thay vào đó, hiển thị thông báo tạm thời (xóa dòng này trong ứng dụng thực tế)
    // showSearchNotification(searchParams);
  }
  
  // Hiển thị thông báo tạm thời - chỉ cho mục đích demo
  function showSearchNotification(params) {
    // Xóa thông báo cũ nếu có
    const oldNotification = document.querySelector('.search-notification');
    if (oldNotification) {
      oldNotification.remove();
    }
    
    // Tạo thông báo mới
    const notification = document.createElement('div');
    notification.className = 'search-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #3c1818;
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      z-index: 1000;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      max-width: 80%;
    `;
    
    // Tạo nội dung thông báo
    let notificationContent = '<h3 style="margin-top: 0;">Đang tìm kiếm:</h3><ul style="padding-left: 20px;">';
    
    if (params.keyword) {
      notificationContent += `<li>Từ khóa: ${params.keyword}</li>`;
    }
    
    if (params.district) {
      const districtText = districtSelect.options[districtSelect.selectedIndex].text;
      notificationContent += `<li>Khu vực: ${districtText}</li>`;
    }
    
    if (params.price) {
      const priceText = priceSelect.options[priceSelect.selectedIndex].text;
      notificationContent += `<li>Giá: ${priceText}</li>`;
    }
    
    if (params.area) {
      const areaText = areaSelect.options[areaSelect.selectedIndex].text;
      notificationContent += `<li>Diện tích: ${areaText}</li>`;
    }
    
    if (params.street) {
      const streetText = streetSelect.options[streetSelect.selectedIndex].text;
      notificationContent += `<li>Đường: ${streetText}</li>`;
    }
    
    notificationContent += '</ul>';
    
    if (!params.keyword && !params.district && !params.price && !params.area && !params.street) {
      notificationContent = '<p style="margin: 0;">Vui lòng chọn ít nhất một tiêu chí tìm kiếm</p>';
    }
    
    notification.innerHTML = notificationContent;
    
    // Thêm nút đóng
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
      position: absolute;
      top: 5px;
      right: 10px;
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    `;
    closeButton.addEventListener('click', function() {
      notification.remove();
    });
    
    notification.appendChild(closeButton);
    
    // Thêm thông báo vào trang
    document.body.appendChild(notification);
    
    // Tự động đóng thông báo sau 5 giây
    setTimeout(function() {
      if (document.body.contains(notification)) {
        notification.remove();
      }
    }, 5000);
  }
  
  // Đăng ký sự kiện thay đổi cho các select để cập nhật UI khi người dùng chọn
  const allSelects = [districtSelect, priceSelect, areaSelect, streetSelect];
  
  allSelects.forEach(select => {
    if (select) {
      select.addEventListener('change', function() {
        // Hiển thị visual feedback khi người dùng chọn một tùy chọn
        if (this.value) {
          this.classList.add('selected');
        } else {
          this.classList.remove('selected');
        }
      });
    }
  });
});
