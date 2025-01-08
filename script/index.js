
// loader//

$(window).on('load', function () {
  // Add a delay before hiding the loader
  setTimeout(function () {
    $('#loader').fadeOut('fast'); // Smoothly hide the loader
  },0); // Delay of 2000ms (2 seconds)
});

$(document).ready(function () {
  // Ensure the loader is visible while the page is loading
  $('#loader').show();
});


// google translate //

// $(document).ready(function () {
//     new google.translate.TranslateElement(
//       {
//         // pageLanguage: 'en', // Set default language to English
//         includedLanguages: 'en,es,de,ru,fr' // Specify the languages to be included
//       },
//       'google_translate_element'
//     );
  
//     // Ensure the English option is selected by default
//     setTimeout(function () {
//       var select = document.querySelector('.goog-te-combo');
//       if (select) {
//         select.value = 'en'; // Set the value to English
//         select.dispatchEvent(new Event('change')); // Trigger the change event
//       }
//     }, 100); // Adjust delay if needed
//   });

$(document).ready(function () {
  // Function to initialize Google Translate
  const initializeGoogleTranslate = () => {
    new google.translate.TranslateElement(
      {
        // pageLanguage: 'en', // Set default language to English
        includedLanguages: 'en,es,de,ru,fr', // Specify the languages to be included
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
  };

  // Initialize Google Translate on page load
  initializeGoogleTranslate();

  // Listen for page navigation or custom events
  $(window).on('pageChange', function () {
    // Clear previous Google Translate element if necessary
    $('#google_translate_element').empty();
    initializeGoogleTranslate();
  });
});




// age-gate//
$(document).ready(function () {
  const $ageGate = $("#ageGate");
  const $ageForm = $("#ageForm");
  const $birthYearInput = $("#birthYear");
  const $rememberCheckbox = $("#rememberCheckbox");

  // Function to toggle body scrolling
  const toggleBodyScroll = (disable) => {
    $("body").css("overflow", disable ? "hidden" : "");
  };

  // Function to trigger GSAP animations
  const triggerAnimations = () => {
    gsap.from(".animation-1", {
      delay:0.8,
      duration: 0.8,
      y: 100,
      opacity: 0,
      stagger:0.1,
    });
    gsap.from(".header1-container", {
      delay:0.8,
      duration: 0.8,
      y: -100,
      opacity: 0,
    });
  };

  // Check if the user has already verified their age
  const ageVerified = localStorage.getItem("ageVerified");
  const sessionVerified = sessionStorage.getItem("sessionVerified");

  if (ageVerified === "true" || sessionVerified === "true") {
    // User has already verified age, hide the age-gate and enable scrolling
    $ageGate.hide();
    toggleBodyScroll(false);
    triggerAnimations(); // Trigger animations
  } else {
    // Age-gate is visible; disable scrolling
    toggleBodyScroll(true);
  }

  // Set checkbox to checked by default
  $rememberCheckbox.prop("checked", true);

  $ageForm.on("submit", function (e) {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    const birthYear = parseInt($birthYearInput.val(), 10);

    // Validate input
    if (
      !birthYear ||
      $birthYearInput.val().length !== 4 ||
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

      if ($rememberCheckbox.is(":checked")) {
        // Save verification in localStorage if checkbox is checked
        localStorage.setItem("ageVerified", "true");
      } else {
        // Only session-level verification, don't save to localStorage
        localStorage.removeItem("ageVerified");
      }

      $ageGate.hide();
      toggleBodyScroll(false); // Enable scrolling
      triggerAnimations(); // Trigger animations after verification
    } else {
      alert("You must be at least 21 years old to access this site.");
    }
  });

  // Restrict input to numeric values only
  $birthYearInput.on("input", function () {
    const value = $(this).val().replace(/\D/g, "").slice(0, 4);
    $(this).val(value);
  });
});

  // header //
  $(document).ready(function() {
    const $menuBar = $(".menu-bar");
    const $closeButton = $(".ph-x");
    const $headerWrapper = $(".header-2-wrapper");
    const $headerImage = $(".header-2-image"); // Select the header image element
    
    $menuBar.on("click", function() {
      $headerWrapper.toggleClass("show-header-2");
      toggleBodyScroll($headerWrapper.hasClass("show-header-2"));
    });
  
    $closeButton.on("click", function() {
      $headerWrapper.removeClass("show-header-2");
      toggleBodyScroll(false);
    });
  
    // Close the header when clicking on the header image
    $headerImage.on("click", function() {
      $headerWrapper.removeClass("show-header-2");
      toggleBodyScroll(false);
    });
  
    // Function to toggle body scrolling
    const toggleBodyScroll = (disable) => {
      $("body").css("overflow", disable ? "hidden" : "");
    };
  });
  
  // search bar show and hide  //

  $(document).ready(function() {
    // Ensure search-wrapper is hidden on initial load
    $('.search-wrapper').hide();
  
    // Toggle search-wrapper visibility with a fade effect when search-btn is clicked
    $('.search-btn').on('click', function(event) {
      event.stopPropagation(); // Prevent the click from propagating to the document
      if ($('.search-wrapper').is(':visible')) {
        $('.search-wrapper').fadeOut();
        $('body').removeClass('no-scroll');
      } else {
        $('.search-wrapper').fadeIn();
        $('body').addClass('no-scroll');
      }
    });
  
    // Hide search-wrapper with a fade effect when clicking outside of search-container
    $(document).on('click', function(event) {
      if (!$(event.target).closest('.search-container').length) {
        $('.search-wrapper').fadeOut();
        $('body').removeClass('no-scroll');
      }
    });
  
    // Prevent hiding when clicking inside search-container
    $('.search-container').on('click', function(event) {
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
  $(document).ready(function() {
    // Check the window's scroll position on page load and toggle the scale of the "to-top" button
    toggleToTopButton();
  
    // Toggle the scale of the "to-top" button on scroll
    $(window).scroll(function() {
      toggleToTopButton();
    });
  
    // Scroll to top when the "to-top" button is clicked
    $('.to-top').click(function() {
      $('html, body').animate({ scrollTop: 0 }, 200); // Scroll to top with 200ms duration
    });
  
    // Function to toggle the scale of the "to-top" button
    function toggleToTopButton() {
      if ($(window).scrollTop() === 0) {
        $('.to-top').css('transform', 'scale(0)');
      } else {
        $('.to-top').css('transform', 'scale(1)');
      }
    }
  });
  

// ----------products fetch dynamically------- //

// new arrivals products //

$(document).ready(function () {
  // Fetch the JSON file from the "products" folder
  $.getJSON("/products/products.json", function (data) {
    // Access the new-arrivals product data
    const newArrivals = data.products["new-arrivals"];

    // Loop through the new-arrivals array and construct a slide for each product
    let slides = '';
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
    $("#new-arrivals-products .swiper-wrapper").html(slides);
  }).fail(function () {
    console.error("Error loading JSON file.");
  });
});


//whisky products //

$(document).ready(function () {
  // Fetch the JSON file from the "products" folder
  $.getJSON("/products/products.json", function (data) {
    // Access both whisky and new arrivals product data
    const whisky = data.products.whisky;
    const newArrivals = data.products["new-arrivals"];

    // Combine both whisky and new-arrivals into a single array
    const combinedProducts = whisky.concat(newArrivals.filter(function (newArrival) {
      // Only include new arrival products with a type matching whisky products
      return whisky.some(function (whiskyProduct) {
        return whiskyProduct.product_type === newArrival.product_type;
      });
    }));

    // Loop through the combined array and construct a slide for each product
    let slides = '';
    combinedProducts.forEach(function (product) {
      // Check if ribbon image exists before adding it to the slide
      const ribbonImage = product.images.ribbon ? `<div class="ribbon"><img src="${product.images.ribbon}" /></div>` : '';

      const slide = `
  <div class="swiper-slide">
    <a href="productdetails.html?id=${product.id}">
      <div class="product-card">
        ${ribbonImage}  <!-- Only adds ribbon if available -->
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
    $("#whisky-products .swiper-wrapper").html(slides);
  }).fail(function () {
    console.error("Error loading JSON file.");
  });
});


// tequila products //
$(document).ready(function () {
  // Fetch the JSON file from the "products" folder
  $.getJSON("/products/products.json", function (data) {
    // Access both tequila and new arrivals product data
    const tequila = data.products.tequila;
    const newArrivals = data.products["new-arrivals"];

    // Combine both tequila and new-arrivals into a single array
    const combinedProducts = tequila.concat(newArrivals.filter(function (newArrival) {
      // Only include new arrival products with a type matching tequila products
      return tequila.some(function (tequilaProduct) {
        return tequilaProduct.product_type === newArrival.product_type;
      });
    }));

    // Loop through the combined array and construct a slide for each product
    let slides = '';
    combinedProducts.forEach(function (product) {
      // Check if ribbon image exists before adding it to the slide
      const ribbonImage = product.images.ribbon ? `<div class="ribbon"><img src="${product.images.ribbon}" /></div>` : '';

      const slide = `
  <div class="swiper-slide">
    <a href="productdetails.html?id=${product.id}">
      <div class="product-card">
        ${ribbonImage}  <!-- Only adds ribbon if available -->
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
    $("#tequila-products .swiper-wrapper").html(slides);
  }).fail(function () {
    console.error("Error loading JSON file.");
  });
});

// sotol products //
$(document).ready(function () {
  // Fetch the JSON file from the "products" folder
  $.getJSON("/products/products.json", function (data) {
    // Access both sotol and new arrivals product data
    const sotol = data.products.sotol;
    const newArrivals = data.products["new-arrivals"];

    // Combine both sotol and new-arrivals into a single array
    const combinedProducts = sotol.concat(newArrivals.filter(function (newArrival) {
      // Only include new arrival products with a type matching sotol products
      return sotol.some(function (sotolProduct) {
        return sotolProduct.product_type === newArrival.product_type;
      });
    }));

    // Loop through the combined array and construct a slide for each product
    let slides = '';
    combinedProducts.forEach(function (product) {
      // Check if ribbon image exists before adding it to the slide
      const ribbonImage = product.images.ribbon ? `<div class="ribbon"><img src="${product.images.ribbon}" /></div>` : '';

      const slide = `
  <div class="swiper-slide">
    <a href="productdetails.html?id=${product.id}">
      <div class="product-card">
        ${ribbonImage}  <!-- Only adds ribbon if available -->
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
    $("#sotol-products .swiper-wrapper").html(slides);
  }).fail(function () {
    console.error("Error loading JSON file.");
  });
});


// gin products //
$(document).ready(function () {
  // Fetch the JSON file from the "products" folder
  $.getJSON("/products/products.json", function (data) {
    // Access both gin and new arrivals product data
    const gin = data.products.gin;
    const newArrivals = data.products["new-arrivals"];

    // Combine both gin and new-arrivals into a single array
    const combinedProducts = gin.concat(newArrivals.filter(function (newArrival) {
      // Only include new arrival products with a type matching gin products
      return gin.some(function (ginProduct) {
        return ginProduct.product_type === newArrival.product_type;
      });
    }));

    // Loop through the combined array and construct a slide for each product
    let slides = '';
    combinedProducts.forEach(function (product) {
      // Check if ribbon image exists before adding it to the slide
      const ribbonImage = product.images.ribbon ? `<div class="ribbon"><img src="${product.images.ribbon}" /></div>` : '';

      const slide = `
  <div class="swiper-slide">
    <a href="productdetails.html?id=${product.id}">
      <div class="product-card">
        ${ribbonImage}  <!-- Only adds ribbon if available -->
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
    $("#gin-products .swiper-wrapper").html(slides);
  }).fail(function () {
    console.error("Error loading JSON file.");
  });
});

// beer //
$(document).ready(function () {
  // Fetch the JSON file from the "products" folder
  $.getJSON("/products/products.json", function (data) {
    // Access both beer and new arrivals product data
    const beer = data.products.beer;
    const newArrivals = data.products["new-arrivals"];

    // Combine both beer and new-arrivals into a single array
    const combinedProducts = beer.concat(newArrivals.filter(function (newArrival) {
      // Only include new arrival products with a type matching beer products
      return beer.some(function (beerProduct) {
        return beerProduct.product_type === newArrival.product_type;
      });
    }));

    // Loop through the combined array and construct a slide for each product
    let slides = '';
    combinedProducts.forEach(function (product) {
      // Check if ribbon image exists before adding it to the slide
      const ribbonImage = product.images.ribbon ? `<div class="ribbon"><img src="${product.images.ribbon}" /></div>` : '';

      const slide = `
  <div class="swiper-slide">
    <a href="productdetails.html?id=${product.id}">
      <div class="product-card">
        ${ribbonImage}  <!-- Only adds ribbon if available -->
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
    $("#beer-products .swiper-wrapper").html(slides);
  }).fail(function () {
    console.error("Error loading JSON file.");
  });
});


// Fetch product details //

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
    $.getJSON("/products/products.json", function (data) {
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
        if (product.product_type) $("#product-type").text(product.product_type);
        else $("#product-type").parent().hide(); // Hide the container if product_type is missing
        
        if (product.product_name) $("#product-name").text(product.product_name);
        else $("#product-name").parent().hide(); // Hide the container if product_name is missing
        
        if (product.description.summary) $("#description-1").text(product.description.summary);
        else $("#description-1").parent().hide(); // Hide the container if description.summary is missing
        
        if (product.description.palate) $("#description-2").text(product.description.palate);
        else $("#description-2").parent().hide(); // Hide the container if description.palate is missing
        
        if (product.details.country_of_origin) $("#country-name").text(product.details.country_of_origin);
        else $("#country-name").parent().hide(); // Hide the container if country_of_origin is missing
        
        if (product.details.alcohol_volume) $("#alcohol-vol").text(product.details.alcohol_volume);
        else $("#alcohol-vol").parent().hide(); // Hide the container if alcohol_volume is missing
        
        if (product.details.pack_size) $("#pack-size").text(product.details.pack_size);
        else $("#pack-size").parent().hide(); // Hide the container if pack_size is missing

        if (product.characteristics.visual && product.characteristics.visual.title) {
          $("#visual-title").text(product.characteristics.visual.title);
          $("#visual").text(product.characteristics.visual.description);
        } else {
          $("#visual-title").parent().hide(); // Hide the container if visual characteristic is missing
        }

        if (product.characteristics.aromatic && product.characteristics.aromatic.title) {
          $("#aromatic-title").text(product.characteristics.aromatic.title);
          $("#aromatic").text(product.characteristics.aromatic.description);
        } else {
          $("#aromatic-title").parent().hide(); // Hide the container if aromatic characteristic is missing
        }

        if (product.characteristics.taste && product.characteristics.taste.title) {
          $("#taste-title").text(product.characteristics.taste.title);
          $("#taste").text(product.characteristics.taste.description);
        } else {
          $("#taste-title").parent().hide(); // Hide the container if taste characteristic is missing
        }

        if (product.characteristics.aftertaste && product.characteristics.aftertaste.title) {
          $("#aftertaste-title").text(product.characteristics.aftertaste.title);
          $("#aftertaste").text(product.characteristics.aftertaste.description);
        } else {
          $("#aftertaste-title").parent().hide(); // Hide the container if aftertaste characteristic is missing
        }

        if (product.images.product_image) $("#product-image").attr("src", product.images.product_image);
        else $("#product-image").parent().hide(); // Hide the container if product_image is missing

        if (product.images.background_image) $("#background-image").attr("src", product.images.background_image);
        else $("#background-image").parent().hide(); // Hide the container if background_image is missing
      } else {
        console.error("Product not found.");
      }
    }).fail(function () {
      console.error("Error loading JSON file.");
    });
  } else {
    console.error("Product ID is missing in the URL.");
  }
});


// fetch new products every time on product detail page //

$(document).ready(function () {
  // Load products data
  $.getJSON("/products/products.json",function (data) {
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
    $("#product-slider-wrapper").empty();

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
      $("#product-slider-wrapper").append(productSlide);
    });

  }).fail(function () {
    console.error("Error loading JSON file.");
  });
});


//search bar //
$(document).ready(function() {
  let productsArray = [];

  // Fetch the JSON file and extract product types and product names
  $.getJSON('/products/products.json', function(data) {
    // Extracting keywords from 'product_type' and 'product_name' fields
    $.each(data.products, function(category, items) {
      $.each(items, function(index, item) {
        productsArray.push(item.product_type.toLowerCase());
        productsArray.push(item.product_name.toLowerCase());
      });
    });
  });

  // Search input event handler
  $('#search-input').on('input', function() {
    const query = $(this).val().toLowerCase();
    $('.suggestions').empty(); // Clear previous suggestions

    if (query.length > 0) {
      // Create a Set to remove duplicate suggestions
      const filteredSuggestions = [...new Set(productsArray.filter(function(item) {
        return item.includes(query);
      }))];

      // Loop through the filtered suggestions and append to suggestions div
      $.each(filteredSuggestions, function(index, suggestion) {
        const suggestionElement = $('<div>')
          .addClass('suggestion-item')
          .text(suggestion)
          .on('click', function() {
            $('#search-input').val(suggestion);
            $('.suggestions').empty(); // Clear suggestions after selection
            window.location.href = 'searchresult.html?query=' + encodeURIComponent(suggestion); // Redirect to search results page
          });

        $('.suggestions').append(suggestionElement);
      });
    }
  });

  // Handle the Enter key to trigger search
  $('#search-input').on('keypress', function(e) {
    if (e.which === 13) { // Enter key
      const query = $(this).val().toLowerCase();
      if (query.length > 0 && productsArray.includes(query)) {
        window.location.href = 'searchresult.html?query=' + encodeURIComponent(query); // Redirect to search results page
        $('#search-input').val(''); // Clear the search input after redirect
      } else {
        // Handle cases where the query doesn't match any suggestion
        // For example, you can show a message or perform a different action
        console.log('No matching product found.');
      }
      e.preventDefault(); // Prevent default form submission
    }
  });

  // Clear the input when the user leaves the page
  $(window).on('beforeunload', function() {
    $('#search-input').val(''); // Clear the input field before leaving
  });
});  


// prevent user to go back on search page //
$(document).ready(function() {
  // Set a flag in sessionStorage indicating that the user is on the search result page
  sessionStorage.setItem('visitedSearchResult', 'true');

  // When the user leaves the searchresult.html page, clear the flag
  $(window).on('beforeunload', function() {
    sessionStorage.removeItem('visitedSearchResult'); // Remove the visited flag when leaving the page
  });
});


$(document).ready(function() {
  // Check if the user visited searchresult.html
  if (sessionStorage.getItem('visitedSearchResult')) {
    // Prevent going back to the search result page
    history.pushState(null, '', window.location.href); // Push current state to prevent back navigation
    window.onpopstate = function() {
      history.pushState(null, '', window.location.href); // Keep the user on the same page when they try to go back
    };
  }
});


// search products display//

$(document).ready(function() {
  // Get the search query from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query').toLowerCase();

  // Fetch the JSON file and extract product data
  $.getJSON('/products/products.json', function(data) {
    const filteredProducts = [];

    // Loop through the data and filter products based on the search query
    $.each(data.products, function(category, items) {
      $.each(items, function(index, item) {
        const productName = item.product_name.toLowerCase();
        const productType = item.product_type.toLowerCase();

        // Check if either product name or product type matches the query
        if (productName.includes(query) || productType.includes(query)) {
          filteredProducts.push(item);
        }
      });
    });

    const productsPerPage = 6;
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Display the filtered products for the first page
    function displayProducts(page) {
      const startIndex = (page - 1) * productsPerPage;
      const endIndex = page * productsPerPage;
      const productsToShow = filteredProducts.slice(startIndex, endIndex);

      // Clear the current list
      $('.search-products-list .row').html('');

      // Loop through and display the products for the current page
      $.each(productsToShow, function(index, product) {
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
                  <img src="./images/bottle-sample.png" alt="bottle" class="product-image" />
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

        $('.search-products-list .row').append(productCard);
      });
    }

    // Pagination logic
    function createPagination() {
      if (totalPages > 1) {
        let paginationHTML = '<div class="pagination">';
        
        for (let i = 1; i <= totalPages; i++) {
          paginationHTML += `<a href="#" class="page-link" data-page="${i}">${i}</a>`;
        }
        
        paginationHTML += '</div>';
        $('.pagination-container').html(paginationHTML);

        // Handle page link click
        $('.page-link').on('click', function(event) {
          event.preventDefault();
          const page = $(this).data('page');
          displayProducts(page);
        });
      }
    }

    // Display products and pagination
    if (filteredProducts.length > 0) {
      displayProducts(1); // Show first page of products
      createPagination();  // Create pagination links
    } else {
      // Show a message if no products are found
      $('.search-products-list .row').html('<p>No products found matching your search.</p>');
    }
  });
});


// search bar for on searchresult page //
$(document).ready(function() {
  function setupSearchBar(searchBarId, jsonFilePath, suggestionsClass) {
    let productsArray = [];

    // Fetch the JSON file and extract product types and product names
    $.getJSON(jsonFilePath, function(data) {
      $.each(data.products, function(category, items) {
        $.each(items, function(index, item) {
          productsArray.push(item.product_type.toLowerCase());
          productsArray.push(item.product_name.toLowerCase());
        });
      });
    });

    // Check if there's a search query in the URL (for search results page)
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('query');
    if (queryParam) {
      $(`#${searchBarId} #search-input`).val(decodeURIComponent(queryParam)); // Set the input value to the query
    }

    // Search input event handler
    $(`#${searchBarId} #search-input`).on('input', function() {
      const query = $(this).val().toLowerCase();
      $(`#${searchBarId} .${suggestionsClass}`).empty(); // Clear previous suggestions

      if (query.length > 0) {
        const filteredSuggestions = [...new Set(productsArray.filter(function(item) {
          return item.includes(query);
        }))];

        $.each(filteredSuggestions, function(index, suggestion) {
          const suggestionElement = $('<div>')
            .addClass('suggestion-item')
            .text(suggestion)
            .on('click', function() {
              // Set the clicked suggestion as the value of the input
              $(`#${searchBarId} #search-input`).val(suggestion);
              $(`#${searchBarId} .${suggestionsClass}`).empty();
              window.location.href = 'searchresult.html?query=' + encodeURIComponent(suggestion);
            });

          $(`#${searchBarId} .${suggestionsClass}`).append(suggestionElement);
        });
      }
    });

    // Handle the Enter key to trigger search
    $(`#${searchBarId} #search-input`).on('keypress', function(e) {
      if (e.which === 13) {
        const query = $(this).val().toLowerCase();
        if (query.length > 0 && productsArray.includes(query)) {
          // Navigate to the search results page and keep the search term in the input field
          window.location.href = 'searchresult.html?query=' + encodeURIComponent(query);
        } else {
          // If no match is found, keep the input field value as is
          console.log('No matching product found.');
        }
        e.preventDefault();
      }
    });

    // Clear the input when the user leaves the page
    $(window).on('beforeunload', function() {
      $(`#${searchBarId} #search-input`).val('');
    });
  }

  // Initialize the search bar
  setupSearchBar('searchbar-2', '/products/products.json', 'suggestions');
});









