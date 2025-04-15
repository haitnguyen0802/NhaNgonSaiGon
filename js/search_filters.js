document.addEventListener('DOMContentLoaded', function() {
  // Handle search form submission
  const searchForm = document.querySelector('.search-main');
  const searchButton = document.querySelector('.search-button');
  
  if (searchForm && searchButton) {
    searchButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      const mainInput = searchForm.querySelector('.search-input input').value;
      const district = searchForm.querySelector('select[name="district"]').value;
      const price = searchForm.querySelector('select[name="price"]').value;
      const area = searchForm.querySelector('select[name="area"]').value;
      const street = searchForm.querySelector('.street-input').value;
      
      // Build search query
      let searchParams = [];
      if (mainInput) searchParams.push(`q=${encodeURIComponent(mainInput)}`);
      if (district) searchParams.push(`district=${encodeURIComponent(district)}`);
      if (price) searchParams.push(`price=${encodeURIComponent(price)}`);
      if (area) searchParams.push(`area=${encodeURIComponent(area)}`);
      if (street) searchParams.push(`street=${encodeURIComponent(street)}`);
      
      // Construct the search URL
      // Replace with your actual search endpoint
      const searchUrl = `/search?${searchParams.join('&')}`;
      
      // For demonstration, alert the search parameters
      console.log('Search URL:', searchUrl);
      alert(`Tìm kiếm với các thông số:\nNội dung: ${mainInput}\nQuận/huyện: ${district}\nMức giá: ${price}\nDiện tích: ${area}\nTên đường: ${street}`);
      
      // Uncomment to perform actual navigation
      // window.location.href = searchUrl;
    });
  }
  
  // Handle responsive behavior on mobile
  function adjustForMobile() {
    const filterRow = document.querySelector('.filter-row');
    
    if (filterRow) {
      if (window.innerWidth <= 768) {
        // Mobile behavior: Add a toggle button for filters
        if (!document.querySelector('.filter-toggle')) {
          const toggleButton = document.createElement('div');
          toggleButton.className = 'filter-toggle';
          toggleButton.innerHTML = `
            <span>Lọc thêm</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          `;
          
          const searchInput = document.querySelector('.search-input');
          searchInput.after(toggleButton);
          
          // Initially hide the filter row on mobile
          filterRow.style.display = 'none';
          
          // Toggle filter visibility
          toggleButton.addEventListener('click', function() {
            if (filterRow.style.display === 'none') {
              filterRow.style.display = 'flex';
              toggleButton.querySelector('span').textContent = 'Ẩn bộ lọc';
              toggleButton.querySelector('svg').innerHTML = '<path d="M18 15l-6-6-6 6"></path>';
            } else {
              filterRow.style.display = 'none';
              toggleButton.querySelector('span').textContent = 'Lọc thêm';
              toggleButton.querySelector('svg').innerHTML = '<path d="M6 9l6 6 6-6"></path>';
            }
          });
        }
      } else {
        // Desktop behavior: Always show filters
        filterRow.style.display = 'flex';
        
        // Remove toggle button if it exists
        const toggleButton = document.querySelector('.filter-toggle');
        if (toggleButton) {
          toggleButton.remove();
        }
      }
    }
  }
  
  // Run on load and resize
  adjustForMobile();
  window.addEventListener('resize', adjustForMobile);
}); 