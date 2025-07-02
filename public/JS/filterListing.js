const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".listing-card");

function applyFilterLogic() {
  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      const selectedCategory = filter.getAttribute("data-category");
  
      cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        const shouldShow = selectedCategory === "All" || cardCategory === selectedCategory;
        card.parentElement.style.display = shouldShow ? "block" : "none";
      });
  
      // Optional: add active filter highlighting
      filters.forEach(f => f.classList.remove("active-filter"));
      filter.classList.add("active-filter");
    });
  }); 
  // Set default "All" as active on initial load
  window.addEventListener("DOMContentLoaded", () => {
    const defaultFilter = document.querySelector('.filter[data-category="All"]');
    if (defaultFilter) {
      defaultFilter.classList.add("active-filter");
    }
  });
  

  
  
  
  // Reusable Searching function
  function filterListings(query) {
    const lowerQuery = query.trim().toLowerCase();
  
    cards.forEach(card => {
      const location = card.getAttribute("data-location").toLowerCase();
      const shouldShow = location.includes(lowerQuery);
      card.parentElement.style.display = shouldShow ? "block" : "none";
    });
  }
  
  // Desktop navbar search
  const desktopSearch = document.querySelector(".search-area input[type='search']");
  if (desktopSearch) {
    desktopSearch.addEventListener("input", () => {
      filterListings(desktopSearch.value);
    });
  }
  
  // Mobile (collapsed) navbar search
  const mobileSearch = document.querySelector(".collapsed-search-area input[type='search']");
  if (mobileSearch) {
    mobileSearch.addEventListener("input", () => {
      filterListings(mobileSearch.value);
    });
  }
  
}
// Call once on page load
document.addEventListener("DOMContentLoaded", () => {
  const defaultFilter = document.querySelector('.filter[data-category="All"]');
  if (defaultFilter) defaultFilter.classList.add("active-filter");

  applyFilterLogic();
});

const taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click",() => {
  let taxInfo = document.getElementsByClassName("tax-Info");
  for(let info of taxInfo){
    if(info.style.display != "inline"){
      info.style.display = "inline";
    }else{
      info.style.display = "none"
    }
  }
})