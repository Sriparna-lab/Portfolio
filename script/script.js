// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item .nav-link:not(.dropdown-toggle)");
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    const menuToggle = document.getElementById("navbarSupportedContent");
    //Function to check if the view is mobile
    function isMobileView() {
       return window.innerWidth< 992;
    }
    navLinks.forEach((link) => {
        link.addEventListener("click", () =>  {
            if (isMobileView()) {
            new bootstrap.Collapse(menuToggle).toggle();
          }
        });
    });
    dropdownItems.forEach((item) => {
        item.addEventListener("click", () => {
           if (isMobileView()) { 
           new bootstrap.Collapse(menuToggle).toggle();
          }
        });
    }); 
}

document.addEventListener("DOMContentLoaded", () => {
    const translations = {};
    // Fetch translations from JSON file
    fetch("data/translation.json")
      .then(response => response.json())
      .then(data => {
        Object.assign(translations, data);
    })
      .catch(error => console.error('Error loading translations:', error));
  
    // Function to translate page content
    function translatePage(language, event) {
        event.preventDefault();
        const elements = document.querySelectorAll("body *");
        elements.forEach(el => {
            if (el.childNodes && el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
                const text = el.innerText.trim();
            if (translations[language] && translations[language][text]) {
                el.innerText = translations[language][text];
                }
            }
        });
    }
    // Assign the function to the window object so it can be called from HTML
    window.translatePage = translatePage;
});
  
// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" alt="${item.alt}"/>
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

            // If the index is a multiple of 3 or it's the last element, create a new row
            if ((index + 1) % 3 === 0 || index === data.length - 1) {
                container.appendChild(row);
                row = document.createElement("div");
                row.classList.add("row");
            }
        });
    });
}

// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row");

     // Load the JSON file
     fetch("data/portfolio.json")
     .then((response) => response.json())
     .then((data) => {
        // Iterate through the JSON data and create HTML elements
        data.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("col-lg-4", "mt-4");
            card.innerHTML = `
                <div class="card portfolioContent">
                <img class="card-img-top" src="images/${item.image}"  alt="${item.alt}" style="width:100% ">
                <div class="card-body">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-text">${item.text}</p>
                    <div class="text-center">
                        <a href="${item.link}" target="_blank" class="btn btn-success">
                        <img src="images/git.png" alt="GitHub" style="height: 20px; width: 20px;"> Code source</a>
                    </div>
                </div>
                </div>
                `;
            // Append the card to the current row
            row.appendChild(card);
            // Append row if it has 3 cards or if it's the last row
            if ((index + 1) % 3 === 0 || index === data.length - 1) {
                // If the last row has only 2 cards, center them
                if (index === data.length - 1 || (index + 1) % 3 !== 0 || row.children.length === 2) {
                    row.classList.add("justify-content-center");
                }
                container.appendChild(row);
                row = document.createElement("div");
                row.classList.add("row");
            }
        });
    });
}

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON(); 
