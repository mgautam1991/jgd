/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

 //import Swiper from "../plugins/swiper/swiper-bundle.js";
// import Shuffle from "../plugins/shufflejs/shuffle";

(function () {
  "use strict";

  // Preloader js
  // window.addEventListener("load", (e) => {
  //   document.querySelector(".preloader").style.display = "none";
  // });

  //sticky header
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      header.classList.add("header-sticky");
    } else {
      header.classList.remove("header-sticky");
    }
  });

  //reviews-carousel
  new Swiper(".reviews-carousel", {
    loop: true,
    spaceBetween: 20,
    pagination: {
      el: ".reviews-carousel-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  //auth-banner-carousel
  new Swiper(".auth-banner-carousel", {
    slidesPerView: 1,
    pagination: {
      el: ".auth-banner-carousel .pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true, // Optional if you want an infinite loop
    autoplay: {
      delay: 3000,
    }
  });


  // Tab Component
const tabGroups = document.querySelectorAll("[data-tab-group]");

tabGroups.forEach((tabGroup) => {
  const tabsNav = tabGroup.querySelector("[data-tab-nav]");
  const tabsNavItem = tabsNav?.querySelectorAll("[data-tab]");

  if (!tabsNav || !tabsNavItem) return;

  const activeTabName =
    localStorage.getItem(`activeTabName-${tabGroup.dataset.tabGroup}`) ||
    tabsNavItem[0].getAttribute("data-tab");

  setActiveTab(tabGroup, activeTabName);

  tabsNavItem.forEach((tabNavItem) => {
    tabNavItem.addEventListener("click", (e) => {
      e.preventDefault();
      const tabName = tabNavItem.dataset.tab;
      setActiveTab(tabGroup, tabName);

      localStorage.setItem(
        `activeTabName-${tabGroup.dataset.tabGroup}`,
        tabName
      );
    });
  });
});

function setActiveTab(tabGroup, tabName) {
  const tabsNav = tabGroup.querySelector("[data-tab-nav]");
  const tabsContent = tabGroup.querySelector("[data-tab-content]");

  if (!tabsNav || !tabsContent) return;

  tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
    tabNavItem.classList.remove("active");
  });

  tabsContent.querySelectorAll("[data-tab-panel]").forEach((tabPane) => {
    tabPane.classList.remove("active");
  });

  const selectedTabNavItem = tabsNav.querySelector(`[data-tab="${tabName}"]`);
  const selectedTabPane = tabsContent.querySelector(
    `[data-tab-panel="${tabName}"]`
  );

  if (selectedTabNavItem) selectedTabNavItem.classList.add("active");
  if (selectedTabPane) selectedTabPane.classList.add("active");
}

 

  //counter
  function counter(el, duration) {
    const endValue = Number(el.innerText.replace(/\D/gi, ""));
    const text = el.innerText.replace(/\W|\d/gi, "");
    const timeStep = Math.round(duration / endValue);
    let current = 0;
    const timer = setInterval(() => {
      if (current > endValue) {
        current = endValue;
      } else {
        current += 1;
      }
      el.innerText = current + text;
      if (current === endValue) {
        clearInterval(timer);
      }
    }, timeStep);
  }

  document.querySelectorAll(".counter .count").forEach((count) => {
    counter(count, 500);
  });

  //play youtube-video
  const videoPlayBtn = document.querySelector(".video-play-btn");
  if (videoPlayBtn) {
    videoPlayBtn.addEventListener("click", function () {
      const videoPlayer = this.closest(".video").querySelector(".video-player");
      videoPlayer.classList.remove("hidden");
    });
  }

  // Accordion component
  const accordion = document.querySelectorAll("[data-accordion]");
  accordion.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle("active");
    });
  });

  //shuffle
  const Shuffle = window.Shuffle;
  const tabItems = document.querySelector(".integration-tab-items");
  if (tabItems) {
    const myShuffle = new Shuffle(tabItems, {
      itemSelector: ".integration-tab-item",
      sizer: ".integration-tab-item",
      buffer: 1,
    });
    const tabLinks = document.querySelectorAll(".integration-tab .filter-btn");
    tabLinks.forEach((tabItem) => {
      tabItem.addEventListener("click", function (e) {
        e.preventDefault();
        let filter;
        const group = tabItem.getAttribute("data-group");
        filter = group;
        if (filter === "all") {
          filter = Shuffle.ALL_ITEMS;
        }
        tabLinks.forEach((link) => link.classList.remove("filter-btn-active"));
        this.classList.add("filter-btn-active");
        myShuffle.filter(filter);
      });
    });
  }
})();
