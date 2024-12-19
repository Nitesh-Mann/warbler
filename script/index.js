$(document).ready(function() {
  new google.translate.TranslateElement(
    {
      includedLanguages: 'en'
    },
    'google_translate_element'
  );
});



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

  //Home page //
  const triggerAnimations = () => {
    gsap.from(".animation-1", {
      duration: 0.8,
      y: 100,
      opacity: 0,
    });
    gsap.from(".header1-container", {
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
 
 
//  // Scroll to the top of the page on load
//  window.addEventListener("load", () => {
//   window.scrollTo({ top: 0 });
// });


// header //
$(document).ready(function() {
  const $menuBar = $(".ph-list");
  const $closeButton = $(".ph-x");
  const $headerWrapper = $(".header-2-wrapper");

  $menuBar.on("click", function() {
    $headerWrapper.toggleClass("show-header-2");
    toggleBodyScroll($headerWrapper.hasClass("show-header-2"));
  });


  $closeButton.on("click", function() {
    $headerWrapper.removeClass("show-header-2");
    toggleBodyScroll(false);
  });


  // Function to toggle body scrolling
  const toggleBodyScroll = (disable) => {
    $("body").css("overflow", disable ? "hidden" : "");
  };
});



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


//animations//
// $(document).ready(function(){
//   gsap.from(".animation-2",{
//     y:100,
//     duration:0.6,
//     opacity:0,
//     scrollTrigger:{
//       trigger:".section-2",
//       markers:false,
//       start:"top 70%",
//     }
//   });
// });

// $(document).ready(function(){
//   gsap.from(".animation-3",{
//     y:100,
//     duration:0.6,
//     opacity:0,
//     scrollTrigger:{
//       trigger:".section-3",
//       markers:false,
//       start:"top 70%",
//     }
//   });
// });

$(document).ready(function(){
  gsap.from(".animation-4",{
    rotate:-360,
    duration:0.6,
    scrollTrigger:{
      trigger:".section-4",
      markers:false,
      start:"10% 50%",
      scrub:true,
      end:"85% 0%"
  }
   });
  });
