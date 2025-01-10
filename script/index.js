
// loader//

window.addEventListener('load', function() {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.hidden = true; // Hide loader after a delay
  }, 1000); // Delay of 1000ms (1 second)
});

window.addEventListener('beforeunload', function() {
  const loader = document.getElementById('loader');
  loader.hidden = false; // Show loader immediately
  setTimeout(() => {
    // Optional: Add additional logic here if needed
  }, 500); // Delay to simulate loader being active
});



// google translate //

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the Google Translate element
  new google.translate.TranslateElement(
    {
      // pageLanguage: 'en', // Set default language to English
      includedLanguages: 'en,es,de,ru,fr' // Specify the languages to be included
    },
    'google_translate_element'
  );

  // Ensure the English option is selected by default
  setTimeout(function () {
    var select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = 'en'; // Set the value to English
      select.dispatchEvent(new Event('change')); // Trigger the change event
    }
  }, 100); // Adjust delay if needed
});


// age-gate//

document.addEventListener("DOMContentLoaded", function () {
  const ageGate = document.getElementById("ageGate");
  const ageForm = document.getElementById("ageForm");
  const birthYearInput = document.getElementById("birthYear");
  const rememberCheckbox = document.getElementById("rememberCheckbox");

  // Function to toggle body scrolling
  const toggleBodyScroll = (disable) => {
    document.body.style.overflow = disable ? "hidden" : "";
  };

  // Function to trigger GSAP animations
  const triggerAnimations = () => {
    const animationsPlayed = sessionStorage.getItem("animationsPlayed");

    if (!animationsPlayed) {
      gsap.from(".animation-1", {
        delay: 0.8,
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.1,
      });
      gsap.from(".header1-container", {
        delay: 0.8,
        duration: 0.8,
        y: -100,
        opacity: 0,
        toggleActions: "play none none none",
      });

      // Mark animations as played in this session
      sessionStorage.setItem("animationsPlayed", "true");
    }
  };

  // Check if the user has already verified their age
  const ageVerified = localStorage.getItem("ageVerified");
  const sessionVerified = sessionStorage.getItem("sessionVerified");

  if (ageVerified === "true" || sessionVerified === "true") {
    // User has already verified age, hide the age-gate and enable scrolling
    ageGate.style.display = "none";
    toggleBodyScroll(false);
    triggerAnimations(); // Trigger animations
  } else {
    // Age-gate is visible; disable scrolling
    toggleBodyScroll(true);
  }

  // Set checkbox to checked by default
  rememberCheckbox.checked = true;

  ageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    const birthYear = parseInt(birthYearInput.value, 10);

    // Validate input
    if (
      !birthYear ||
      birthYearInput.value.length !== 4 ||
      birthYear < 1950 ||
      birthYear > currentYear
    ) {
      alert("Please enter a valid birth year");
      return;
    }

    const age = currentYear - birthYear;

    if (age >= 21) {
      // Mark the session as verified
      sessionStorage.setItem("sessionVerified", "true");

      if (rememberCheckbox.checked) {
        // Save verification in localStorage if checkbox is checked
        localStorage.setItem("ageVerified", "true");
      } else {
        // Only session-level verification, don't save to localStorage
        localStorage.removeItem("ageVerified");
      }

      ageGate.style.display = "none";
      toggleBodyScroll(false); // Enable scrolling
      triggerAnimations(); // Trigger animations after verification
    } else {
      alert("You must be at least 21 years old to access this site.");
    }
  });

  // Restrict input to numeric values only
  birthYearInput.addEventListener("input", function () {
    const value = birthYearInput.value.replace(/\D/g, "").slice(0, 4);
    birthYearInput.value = value;
  });
});


  // header //
document.addEventListener("DOMContentLoaded", function () {
    const menuBar = document.querySelector(".menu-bar");
    const closeButton = document.querySelector(".ph-x");
    const headerWrapper = document.querySelector(".header-2-wrapper");
    const headerImage = document.querySelector(".header-2-image"); // Select the header image element
  
    // Function to toggle body scrolling
    const toggleBodyScroll = (disable) => {
      document.body.style.overflow = disable ? "hidden" : "";
    };
  
    menuBar.addEventListener("click", function () {
      headerWrapper.classList.toggle("show-header-2");
      toggleBodyScroll(headerWrapper.classList.contains("show-header-2"));
    });
  
    closeButton.addEventListener("click", function () {
      headerWrapper.classList.remove("show-header-2");
      toggleBodyScroll(false);
    });
  
    // Close the header when clicking on the header image
    headerImage.addEventListener("click", function () {
      headerWrapper.classList.remove("show-header-2");
      toggleBodyScroll(false);
    });
});
  
  // search bar show and hide  //
document.addEventListener("DOMContentLoaded", function () {
    // Ensure search-wrapper is hidden on initial load
    const searchWrapper = document.querySelector(".search-wrapper");
    const searchBtn = document.querySelector(".search-btn");
    const searchContainer = document.querySelector(".search-container");
  
    searchWrapper.style.display = "none";
  
    // Toggle search-wrapper visibility with a fade effect when search-btn is clicked
    searchBtn.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent the click from propagating to the document
      if (searchWrapper.style.display === "none" || searchWrapper.style.display === "") {
        searchWrapper.style.display = "block";
        searchWrapper.style.opacity = "0";
        setTimeout(() => (searchWrapper.style.opacity = "1"), 10); // Fade in
        document.body.classList.add("no-scroll");
      } else {
        searchWrapper.style.opacity = "0"; // Fade out
        setTimeout(() => (searchWrapper.style.display = "none"), 200); // Wait for fade-out to complete
        document.body.classList.remove("no-scroll");
      }
    });
  
    // Hide search-wrapper with a fade effect when clicking outside of search-container
    document.addEventListener("click", function (event) {
      if (!searchContainer.contains(event.target)) {
        searchWrapper.style.opacity = "0"; // Fade out
        setTimeout(() => (searchWrapper.style.display = "none"), 200); // Wait for fade-out to complete
        document.body.classList.remove("no-scroll");
      }
    });
  
    // Prevent hiding when clicking inside search-container
    searchContainer.addEventListener("click", function (event) {
      event.stopPropagation();
    });
});
  
//product swiper //

// Swiper initialization
const swiper = new Swiper('.productSwiper', {
    loop: false, // Enables infinite loop
    slidesPerView: 1, // Default number of slides per view
    spaceBetween: 10, // Default space between slides
    navigation: {
      nextEl: '.swiper-button-next', // Selector for the next button
      prevEl: '.swiper-button-prev', // Selector for the previous button
    },
    autoplay: {
      delay: 6000, // Delay between transitions in milliseconds
      disableOnInteraction: true, // Keeps autoplay running after user interaction
    },
  
    breakpoints: {
      575: {
        slidesPerView: 1, // 1 slide visible for smaller screens
        spaceBetween: 20, // Increased spacing for smaller screens
      },
      751: {
        slidesPerView: 1.5, // 1.5 slides visible for medium screens
        spaceBetween: 20, // Adjusted spacing
      },
      991: {
        slidesPerView: 2, // 2.5 slides visible for larger screens
        spaceBetween: 20, // More spacing for larger screens
      },
      1206: {
        slidesPerView: 3, // 3 slides visible for extra-large screens
        spaceBetween: 30, // Consistent spacing
      },
    },
});

//testimonisl swipper//
  
const Testswiper = new Swiper(".testimonialsSwiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
});

  // scroll to top //
document.addEventListener("DOMContentLoaded", function () {
    // Check the window's scroll position on page load and toggle the scale of the "to-top" button
    toggleToTopButton();
  
    // Toggle the scale of the "to-top" button on scroll
    window.addEventListener("scroll", toggleToTopButton);
  
    // Scroll to top when the "to-top" button is clicked
    document.querySelector(".to-top").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top with smooth behavior
    });
  
    // Function to toggle the scale of the "to-top" button
    function toggleToTopButton() {
      const toTopButton = document.querySelector(".to-top");
      if (window.scrollY === 0) {
        toTopButton.style.transform = "scale(0)";
      } else {
        toTopButton.style.transform = "scale(1)";
      }
    }
});
  
  

// // ----------products fetch dynamically------- //

// // new arrivals products //

document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON file from the "products" folder
  fetch("/products/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error loading JSON file.");
      }
      return response.json();
    })
    .then((data) => {
      // Access the new-arrivals product data
      const newArrivals = data.products["new-arrivals"];

      // Loop through the new-arrivals array and construct a slide for each product
      let slides = "";
      newArrivals.forEach(function (product) {
        const slide = `
          <div class="swiper-slide">
            <a href="productdetails.html?id=${product.id}">
              <div class="product-card">
                <div class="ribbon">
                  <img src="${product.images.ribbon}" />
                </div>
                <div class="card-img-container">
                  <img
                    src="${product.images.product_image}"
                    alt="${product.product_name}"
                    class="product-image"
                  />
                </div>
                <div class="card-content">
                  <div class="card-product-name">
                    <h4 class="product-type">${product.product_type}</h4>
                    <p class="product-name">${product.product_name}</p>
                  </div>
                  <div class="card-arrow">
                    <i class="ph-bold ph-caret-right"></i>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `;
        slides += slide;
      });

      // Append the slides to the specific Swiper wrapper inside #new-arrivals-products
      const swiperWrapper = document.querySelector("#new-arrivals-products .swiper-wrapper");
      swiperWrapper.innerHTML = slides;
    })
    .catch((error) => {
      console.error(error.message);
    });
});


// //whisky products //

document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON file from the "products" folder
  fetch("/products/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error loading JSON file.");
      }
      return response.json();
    })
    .then((data) => {
      // Access both whisky and new arrivals product data
      const whisky = data.products.whisky;
      const newArrivals = data.products["new-arrivals"];

      // Combine both whisky and new-arrivals into a single array
      const combinedProducts = whisky.concat(
        newArrivals.filter((newArrival) =>
          whisky.some((whiskyProduct) => whiskyProduct.product_type === newArrival.product_type)
        )
      );

      // Loop through the combined array and construct a slide for each product
      let slides = "";
      combinedProducts.forEach((product) => {
        // Check if ribbon image exists before adding it to the slide
        const ribbonImage = product.images.ribbon
          ? `<div class="ribbon"><img src="${product.images.ribbon}" /></div>`
          : "";

        const slide = `
          <div class="swiper-slide">
            <a href="productdetails.html?id=${product.id}">
              <div class="product-card">
                ${ribbonImage} <!-- Only adds ribbon if available -->
                <div class="card-img-container">
                  <img
                    src="${product.images.product_image}"
                    alt="${product.product_name}"
                    class="product-image"
                  />
                </div>
                <div class="card-content">
                  <div class="card-product-name">
                    <h4 class="product-type">${product.product_type}</h4>
                    <p class="product-name">${product.product_name}</p>
                  </div>
                  <div class="card-arrow">
                    <i class="ph-bold ph-caret-right"></i>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `;
        slides += slide;
      });

      // Append the slides to the specific Swiper wrapper inside #whisky-products
      const swiperWrapper = document.querySelector("#whisky-products .swiper-wrapper");
      swiperWrapper.innerHTML = slides;
    })
    .catch((error) => {
      console.error(error.message);
    });
});


// // tequila products //
document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON file from the "products" folder
  fetch("/products/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error loading JSON file.");
      }
      return response.json();
    })
    .then((data) => {
      // Access both tequila and new arrivals product data
      const tequila = data.products.tequila;
      const newArrivals = data.products["new-arrivals"];

      // Combine both tequila and new-arrivals into a single array
      const combinedProducts = tequila.concat(
        newArrivals.filter((newArrival) =>
          tequila.some((tequilaProduct) => tequilaProduct.product_type === newArrival.product_type)
        )
      );

      // Loop through the combined array and construct a slide for each product
      let slides = "";
      combinedProducts.forEach((product) => {
        // Check if ribbon image exists before adding it to the slide
        const ribbonImage = product.images.ribbon
          ? `<div class="ribbon"><img src="${product.images.ribbon}" /></div>`
          : "";

        const slide = `
          <div class="swiper-slide">
            <a href="productdetails.html?id=${product.id}">
              <div class="product-card">
                ${ribbonImage} <!-- Only adds ribbon if available -->
                <div class="card-img-container">
                  <img
                    src="${product.images.product_image}"
                    alt="${product.product_name}"
                    class="product-image"
                  />
                </div>
                <div class="card-content">
                  <div class="card-product-name">
                    <h4 class="product-type">${product.product_type}</h4>
                    <p class="product-name">${product.product_name}</p>
                  </div>
                  <div class="card-arrow">
                    <i class="ph-bold ph-caret-right"></i>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `;
        slides += slide;
      });

      // Append the slides to the specific Swiper wrapper inside #tequila-products
      const swiperWrapper = document.querySelector("#tequila-products .swiper-wrapper");
      swiperWrapper.innerHTML = slides;
    })
    .catch((error) => {
      console.error(error.message);
    });
});


// // sotol products //
document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON file from the "products" folder
  fetch("/products/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error loading JSON file.");
      }
      return response.json();
    })
    .then((data) => {
      // Access both sotol and new arrivals product data
      const sotol = data.products.sotol;
      const newArrivals = data.products["new-arrivals"];

      // Combine both sotol and new-arrivals into a single array
      const combinedProducts = sotol.concat(
        newArrivals.filter((newArrival) =>
          sotol.some((sotolProduct) => sotolProduct.product_type === newArrival.product_type)
        )
      );

      // Loop through the combined array and construct a slide for each product
      let slides = "";
      combinedProducts.forEach((product) => {
        // Check if ribbon image exists before adding it to the slide
        const ribbonImage = product.images.ribbon
          ? `<div class="ribbon"><img src="${product.images.ribbon}" /></div>`
          : "";

        const slide = `
          <div class="swiper-slide">
            <a href="productdetails.html?id=${product.id}">
              <div class="product-card">
                ${ribbonImage} <!-- Only adds ribbon if available -->
                <div class="card-img-container">
                  <img
                    src="${product.images.product_image}"
                    alt="${product.product_name}"
                    class="product-image"
                  />
                </div>
                <div class="card-content">
                  <div class="card-product-name">
                    <h4 class="product-type">${product.product_type}</h4>
                    <p class="product-name">${product.product_name}</p>
                  </div>
                  <div class="card-arrow">
                    <i class="ph-bold ph-caret-right"></i>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `;
        slides += slide;
      });

      // Append the slides to the specific Swiper wrapper inside #sotol-products
      const swiperWrapper = document.querySelector("#sotol-products .swiper-wrapper");
      swiperWrapper.innerHTML = slides;
    })
    .catch((error) => {
      console.error(error.message);
    });
});


// // gin products //
document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON file from the "products" folder
  fetch("/products/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error loading JSON file.");
      }
      return response.json();
    })
    .then((data) => {
      // Access both gin and new arrivals product data
      const gin = data.products.gin;
      const newArrivals = data.products["new-arrivals"];

      // Combine both gin and new-arrivals into a single array
      const combinedProducts = gin.concat(
        newArrivals.filter((newArrival) =>
          gin.some((ginProduct) => ginProduct.product_type === newArrival.product_type)
        )
      );

      // Loop through the combined array and construct a slide for each product
      let slides = "";
      combinedProducts.forEach((product) => {
        // Check if ribbon image exists before adding it to the slide
        const ribbonImage = product.images.ribbon
          ? `<div class="ribbon"><img src="${product.images.ribbon}" /></div>`
          : "";

        const slide = `
          <div class="swiper-slide">
            <a href="productdetails.html?id=${product.id}">
              <div class="product-card">
                ${ribbonImage} <!-- Only adds ribbon if available -->
                <div class="card-img-container">
                  <img
                    src="${product.images.product_image}"
                    alt="${product.product_name}"
                    class="product-image"
                  />
                </div>
                <div class="card-content">
                  <div class="card-product-name">
                    <h4 class="product-type">${product.product_type}</h4>
                    <p class="product-name">${product.product_name}</p>
                  </div>
                  <div class="card-arrow">
                    <i class="ph-bold ph-caret-right"></i>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `;
        slides += slide;
      });

      // Append the slides to the specific Swiper wrapper inside #gin-products
      const swiperWrapper = document.querySelector("#gin-products .swiper-wrapper");
      swiperWrapper.innerHTML = slides;
    })
    .catch((error) => {
      console.error(error.message);
    });
});


// // beer //
document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON file from the "products" folder
  fetch("/products/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error loading JSON file.");
      }
      return response.json();
    })
    .then((data) => {
      // Access both beer and new arrivals product data
      const beer = data.products.beer;
      const newArrivals = data.products["new-arrivals"];

      // Combine both beer and new-arrivals into a single array
      const combinedProducts = beer.concat(
        newArrivals.filter((newArrival) =>
          beer.some((beerProduct) => beerProduct.product_type === newArrival.product_type)
        )
      );

      // Loop through the combined array and construct a slide for each product
      let slides = "";
      combinedProducts.forEach((product) => {
        // Check if ribbon image exists before adding it to the slide
        const ribbonImage = product.images.ribbon
          ? `<div class="ribbon"><img src="${product.images.ribbon}" /></div>`
          : "";

        const slide = `
          <div class="swiper-slide">
            <a href="productdetails.html?id=${product.id}">
              <div class="product-card">
                ${ribbonImage} <!-- Only adds ribbon if available -->
                <div class="card-img-container">
                  <img
                    src="${product.images.product_image}"
                    alt="${product.product_name}"
                    class="product-image"
                  />
                </div>
                <div class="card-content">
                  <div class="card-product-name">
                    <h4 class="product-type">${product.product_type}</h4>
                    <p class="product-name">${product.product_name}</p>
                  </div>
                  <div class="card-arrow">
                    <i class="ph-bold ph-caret-right"></i>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `;
        slides += slide;
      });

      // Append the slides to the specific Swiper wrapper inside #beer-products
      const swiperWrapper = document.querySelector("#beer-products .swiper-wrapper");
      swiperWrapper.innerHTML = slides;
    })
    .catch((error) => {
      console.error(error.message);
    });
});



// // Fetch product details //

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    fetch("/products/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error loading JSON file.");
        }
        return response.json();
      })
      .then((data) => {
        // Flatten the product list across all categories (whisky, new arrivals, tequila, etc.)
        const allProducts = [];
        
        // Loop through each category (e.g., whisky, new-arrivals, tequila)
        Object.keys(data.products).forEach(function (category) {
          allProducts.push(...data.products[category]);
        });

        // Find the product by id
        const product = allProducts.find(function (product) {
          return product.id === productId;
        });

        if (product) {
          // Populate product details if they exist
          if (product.product_type) document.getElementById("product-type").textContent = product.product_type;
          else document.getElementById("product-type").parentElement.style.display = 'none'; // Hide the container if product_type is missing

          if (product.product_name) document.getElementById("product-name").textContent = product.product_name;
          else document.getElementById("product-name").parentElement.style.display = 'none'; // Hide the container if product_name is missing

          if (product.description.summary) document.getElementById("description-1").textContent = product.description.summary;
          else document.getElementById("description-1").parentElement.style.display = 'none'; // Hide the container if description.summary is missing

          if (product.description.palate) document.getElementById("description-2").textContent = product.description.palate;
          else document.getElementById("description-2").parentElement.style.display = 'none'; // Hide the container if description.palate is missing

          if (product.details.country_of_origin) document.getElementById("country-name").textContent = product.details.country_of_origin;
          else document.getElementById("country-name").parentElement.style.display = 'none'; // Hide the container if country_of_origin is missing

          if (product.details.alcohol_volume) document.getElementById("alcohol-vol").textContent = product.details.alcohol_volume;
          else document.getElementById("alcohol-vol").parentElement.style.display = 'none'; // Hide the container if alcohol_volume is missing

          if (product.details.pack_size) document.getElementById("pack-size").textContent = product.details.pack_size;
          else document.getElementById("pack-size").parentElement.style.display = 'none'; // Hide the container if pack_size is missing
        
          if (product.details.color) document.getElementById("color").textContent = product.details.color;
          else document.getElementById("color").parentElement.style.display = 'none'; // Hide the container if pack_size is missing
          

          if (product.characteristics.visual && product.characteristics.visual.title) {
            document.getElementById("visual-title").textContent = product.characteristics.visual.title;
            document.getElementById("visual").textContent = product.characteristics.visual.description;
          } else {
            document.getElementById("visual-title").parentElement.style.display = 'none'; // Hide the container if visual characteristic is missing
          }

          if (product.characteristics.aromatic && product.characteristics.aromatic.title) {
            document.getElementById("aromatic-title").textContent = product.characteristics.aromatic.title;
            document.getElementById("aromatic").textContent = product.characteristics.aromatic.description;
          } else {
            document.getElementById("aromatic-title").parentElement.style.display = 'none'; // Hide the container if aromatic characteristic is missing
          }

          if (product.characteristics.taste && product.characteristics.taste.title) {
            document.getElementById("taste-title").textContent = product.characteristics.taste.title;
            document.getElementById("taste").textContent = product.characteristics.taste.description;
          } else {
            document.getElementById("taste-title").parentElement.style.display = 'none'; // Hide the container if taste characteristic is missing
          }

          if (product.characteristics.aftertaste && product.characteristics.aftertaste.title) {
            document.getElementById("aftertaste-title").textContent = product.characteristics.aftertaste.title;
            document.getElementById("aftertaste").textContent = product.characteristics.aftertaste.description;
          } else {
            document.getElementById("aftertaste-title").parentElement.style.display = 'none'; // Hide the container if aftertaste characteristic is missing
          }

          if (product.images.product_image) document.getElementById("product-image").setAttribute("src", product.images.product_image);
          else document.getElementById("product-image").parentElement.style.display = 'none'; // Hide the container if product_image is missing

          if (product.images.background_image) document.getElementById("background-image").setAttribute("src", product.images.background_image);
          else document.getElementById("background-image").parentElement.style.display = 'none'; // Hide the container if background_image is missing
        } else {
          console.error("Product not found.");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  } else {
    console.error("Product ID is missing in the URL.");
  }
});


// // fetch new products every time on product detail page //

document.addEventListener("DOMContentLoaded", function () {
  // Load products data
  fetch("/products/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error loading JSON file.");
      }
      return response.json();
    })
    .then((data) => {
      const allProducts = [];

      // Loop through each category and flatten the product list
      Object.keys(data.products).forEach(function (category) {
        allProducts.push(...data.products[category]);
      });

      // Shuffle the products array and select 6 random products
      function getRandomProducts(products, num) {
        const shuffled = products.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      }

      const randomProducts = getRandomProducts(allProducts, 6);

      // Clear any existing slides before adding new ones
      const productSliderWrapper = document.getElementById("product-slider-wrapper");
      productSliderWrapper.innerHTML = '';

      // Loop through random products and populate the slider
      randomProducts.forEach(function (product) {
        // Conditionally render the ribbon image if it exists
        const ribbonImage = product.images.ribbon ? `<div class="ribbon"><img src="${product.images.ribbon}" /></div>` : '';

        const productSlide = `
          <div class="swiper-slide">
            <a href="productdetails.html?id=${product.id}">
              <div class="product-card">
                ${ribbonImage} <!-- Conditionally added ribbon image -->
                <div class="card-img-container">
                  <img
                    src="${product.images.product_image || './images/bottle-sample.png'}"
                    alt="Product Image"
                    class="product-image"
                  />
                </div>
                <div class="card-content">
                  <div class="card-product-name">
                    <h4 class="product-type">${product.product_type}</h4>
                    <p class="product-name">${product.product_name}</p>
                  </div>
                  <div class="card-arrow">
                    <i class="ph-bold ph-caret-right"></i>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `;

        // Append product slide to the swiper-wrapper
        productSliderWrapper.innerHTML += productSlide;
      });
    })
    .catch((error) => {
      console.error(error.message);
    });
});


// search bars functions //

// fetch what user have search in input //

document.addEventListener("DOMContentLoaded", function () {
  // Get the search query from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query') ? urlParams.get('query') : '';

  // Set the query in the second search bar
  const searchInput2 = document.getElementById('search-input-2');
  if (searchInput2) {
    searchInput2.value = query;
  }

  // You can continue with your existing logic for displaying products based on the query...
});



//search bar //
document.addEventListener("DOMContentLoaded", function () {
  let productsArray = [];

  // Fetch the JSON file and extract product types and product names
  fetch('/products/products.json')
    .then((response) => response.json())
    .then((data) => {
      // Extracting keywords from 'product_type' and 'product_name' fields
      Object.values(data.products).forEach((items) => {
        items.forEach((item) => {
          productsArray.push(item.product_type.toLowerCase());
          productsArray.push(item.product_name.toLowerCase());
        });
      });
    });

  // Search input event handler
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    const suggestionsDiv = document.querySelector('.suggestions');
    suggestionsDiv.innerHTML = ''; // Clear previous suggestions

    if (query.length > 0) {
      // Create a Set to remove duplicate suggestions
      const filteredSuggestions = [...new Set(productsArray.filter(function (item) {
        return item.includes(query);
      }))];

      // Loop through the filtered suggestions and append to suggestions div
      filteredSuggestions.forEach(function (suggestion) {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('suggestion-item');
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener('click', function () {
          searchInput.value = suggestion;
          suggestionsDiv.innerHTML = ''; // Clear suggestions after selection
          window.location.href = 'searchresult.html?query=' + encodeURIComponent(suggestion); // Redirect to search results page
        });

        suggestionsDiv.appendChild(suggestionElement);
      });
    }
  });

  // Handle the Enter key to trigger search
  searchInput.addEventListener('keypress', function (e) {
    if (e.which === 13) { // Enter key
      const query = searchInput.value.toLowerCase();
      if (query.length > 0 && productsArray.includes(query)) {
        window.location.href = 'searchresult.html?query=' + encodeURIComponent(query); // Redirect to search results page
        searchInput.value = ''; // Clear the search input after redirect
      } else {
        // Handle cases where the query doesn't match any suggestion
        console.log('No matching product found.');
      }
      e.preventDefault(); // Prevent default form submission
    }
  });

  // Clear the input when the user leaves the page
  window.addEventListener('beforeunload', function () {
    searchInput.value = ''; // Clear the input field before leaving
  });
});


// search products display//

document.addEventListener("DOMContentLoaded", function () {
  // Get the search query from the URL, and ensure it's safe
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query') ? urlParams.get('query').toLowerCase() : '';

  // Fetch the JSON file and extract product data
  fetch('/products/products.json')
    .then((response) => response.json())
    .then((data) => {
      const filteredProducts = [];

      // Loop through the data and filter products based on the search query
      Object.values(data.products).forEach((items) => {
        items.forEach((item) => {
          const productName = item.product_name ? item.product_name.toLowerCase() : '';
          const productType = item.product_type ? item.product_type.toLowerCase() : '';

          // Check if either product name or product type matches the query
          if (productName.includes(query) || productType.includes(query)) {
            filteredProducts.push(item);
          }
        });
      });

      const productsPerPage = 6;
      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

      // Display the filtered products for the current page
      function displayProducts(page) {
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = page * productsPerPage;
        const productsToShow = filteredProducts.slice(startIndex, endIndex);

        // Clear the current list
        document.querySelector('.search-products-list .row').innerHTML = '';

        // Loop through and display the products for the current page
        productsToShow.forEach((product) => {
          let ribbonHTML = '';
          if (product.ribbon_image && product.ribbon_image !== '') {
            ribbonHTML = `<div class="ribbon"><img src="${product.ribbon_image}" /></div>`;
          }

          const productCard = `
            <div class="col-4">
              <a href="productdetails.html?id=${product.id}">
                <div class="product-card">
                  ${ribbonHTML} <!-- Only include the ribbon if it exists -->
                  <div class="card-img-container">
                    <img src="${product.image || './images/bottle-sample.png'}" alt="product image" class="product-image" />
                  </div>
                  <div class="card-content">
                    <div class="card-product-name">
                      <h4 class="product-type">${product.product_type}</h4>
                      <p class="product-name">${product.product_name}</p>
                    </div>
                    <div class="card-arrow">
                      <i class="ph-bold ph-caret-right"></i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          `;

          document.querySelector('.search-products-list .row').insertAdjacentHTML('beforeend', productCard);
        });
      }

      // Pagination logic
      function createPagination() {
        if (totalPages > 1) {
          let paginationHTML = '<div class="pagination">';

          // Create page links
          for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<a href="#" class="page-link" data-page="${i}">${i}</a>`;
          }

          paginationHTML += '</div>';
          document.querySelector('.pagination-container').innerHTML = paginationHTML;

          // Handle page link click
          document.querySelectorAll('.page-link').forEach((pageLink) => {
            pageLink.addEventListener('click', function (event) {
              event.preventDefault();
              const page = pageLink.getAttribute('data-page');
              displayProducts(page);
            });
          });
        }
      }

      // Display products and pagination
      if (filteredProducts.length > 0) {
        displayProducts(1); // Show first page of products
        createPagination();  // Create pagination links
      } else {
        // Show a message if no products are found
        document.querySelector('.search-products-list .row').innerHTML = '<p>No products found matching your search.</p>';
      }
    })
    .catch(() => {
      console.error("Error loading JSON file.");
    });
});


//search bar -2 //

document.addEventListener("DOMContentLoaded", function () {
  let productsArray = [];
  let currentPage = 1;
  const productsPerPage = 6; // Show 6 products per page

  // Fetch the JSON file and extract product types and product names
  fetch('/products/products.json')
    .then((response) => response.json())
    .then((data) => {
      // Extracting keywords from 'product_type' and 'product_name' fields
      Object.values(data.products).forEach((items) => {
        items.forEach((item) => {
          productsArray.push(item.product_type.toLowerCase());
          productsArray.push(item.product_name.toLowerCase());
        });
      });
    });

  // Search input event handler for searchbar-2
  const searchInput2 = document.getElementById('search-input-2');
  searchInput2.addEventListener('input', function () {
    const query = searchInput2.value.toLowerCase();
    const suggestionsDiv = document.querySelector('#searchbar-2 .suggestions');
    suggestionsDiv.innerHTML = ''; // Clear previous suggestions

    if (query.length > 0) {
      // Create a Set to remove duplicate suggestions
      const filteredSuggestions = [...new Set(productsArray.filter(function (item) {
        return item.includes(query);
      }))];

      // Loop through the filtered suggestions and append to suggestions div
      filteredSuggestions.forEach(function (suggestion) {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('suggestion-item');
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener('click', function () {
          searchInput2.value = suggestion;
          suggestionsDiv.innerHTML = ''; // Clear suggestions after selection
          renderProducts(suggestion); // Render products on the same page
        });

        suggestionsDiv.appendChild(suggestionElement);
      });
    }
  });

  // Handle the Enter key to trigger search for searchbar-2
  searchInput2.addEventListener('keypress', function (e) {
    if (e.which === 13) { // Enter key
      const query = searchInput2.value.toLowerCase();
      if (query.length > 0 && productsArray.includes(query)) {
        renderProducts(query); // Render products on the same page
        searchInput2.value = ''; // Clear the search input after render
      } else {
        // Handle cases where the query doesn't match any suggestion
        console.log('No matching product found.');
      }
      e.preventDefault(); // Prevent default form submission
    }
  });

  // Function to render the filtered products on the same page
  function renderProducts(query) {
    fetch('/products/products.json')
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = [];

        // Loop through the data and filter products based on the search query
        Object.values(data.products).forEach((items) => {
          items.forEach((item) => {
            const productName = item.product_name ? item.product_name.toLowerCase() : '';
            const productType = item.product_type ? item.product_type.toLowerCase() : '';

            // Check if either product name or product type matches the query
            if (productName.includes(query) || productType.includes(query)) {
              filteredProducts.push(item);
            }
          });
        });

        // Clear the current list of products
        const productList = document.querySelector('.search-products-list .row');
        productList.innerHTML = '';

        // Pagination logic
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

        // Get products for the current page
        const startIndex = (currentPage - 1) * productsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

        // Display the filtered products on the same page
        if (paginatedProducts.length > 0) {
          paginatedProducts.forEach((product) => {
            let ribbonHTML = '';
            if (product.ribbon_image && product.ribbon_image !== '') {
              ribbonHTML = `<div class="ribbon"><img src="${product.ribbon_image}" /></div>`;
            }

            const productCard = `
              <div class="col-4">
                <a href="productdetails.html?id=${product.id}">
                  <div class="product-card">
                    ${ribbonHTML} <!-- Only include the ribbon if it exists -->
                    <div class="card-img-container">
                      <img src="${product.image || './images/bottle-sample.png'}" alt="product image" class="product-image" />
                    </div>
                    <div class="card-content">
                      <div class="card-product-name">
                        <h4 class="product-type">${product.product_type}</h4>
                        <p class="product-name">${product.product_name}</p>
                      </div>
                      <div class="card-arrow">
                        <i class="ph-bold ph-caret-right"></i>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            `;

            productList.insertAdjacentHTML('beforeend', productCard);
          });
        } else {
          // If no products found, display a message
          productList.innerHTML = '<p>No products found matching your search.</p>';
        }

        // Render pagination buttons (only numbers) in the pagination container
        renderPagination(totalPages);
      })
      .catch((error) => {
        console.error("Error loading JSON file:", error);
      });
  }

  // Function to render only page number buttons inside the pagination-container
  function renderPagination(totalPages) {
    const paginationDiv = document.querySelector('.pagination-container'); // Use pagination-container class
    paginationDiv.innerHTML = ''; // Clear existing pagination

    if (totalPages > 1) {
      // Create the Bootstrap pagination component
      const paginationList = document.createElement('ul');
      paginationList.classList.add('pagination', 'justify-content-center');

      // Loop through the total number of pages and create page number buttons
      for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        const pageButton = document.createElement('a');
        pageButton.classList.add('page-link');
        pageButton.textContent = i;
        pageButton.addEventListener('click', function () {
          currentPage = i;
          renderProducts(searchInput2.value.toLowerCase());
        });
        
        // Disable the current page
        if (i === currentPage) {
          pageItem.classList.add('active');
        }

        pageItem.appendChild(pageButton);
        paginationList.appendChild(pageItem);
      }

      // Append the pagination list to the pagination container
      paginationDiv.appendChild(paginationList);
    }
  }

  // // Clear the input when the user leaves the page
  // window.addEventListener('beforeunload', function () {
  //   searchInput2.value = ''; // Clear the input field before leaving
  // });
});
























