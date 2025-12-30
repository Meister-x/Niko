// Navigation Bar Component
// This file dynamically loads the navigation bar into all pages

(function() {
  'use strict';

  // Get current page name to set active link
  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.toLowerCase();
  }

  // Get current page hash for anchor links
  function getCurrentHash() {
    return window.location.hash;
  }

  // Navigation bar HTML template
  function getNavbarHTML() {
    const currentPage = getCurrentPage();
    const currentHash = getCurrentHash();
    
    // Determine active links
    const isHome = currentPage === 'index.html' || currentPage === '' || (currentPage.includes('index') && !currentHash);
    const isAbout = currentPage.includes('about.html');
    const isCoursework = currentPage.includes('coursework.html');
    const isAcademic = currentPage.includes('academic.html') || currentPage.includes('competitions.html') || currentPage.includes('lab-projects.html');
    const isQualification = currentPage.includes('qualification.html');
    const isActivities = currentPage.includes('activities.html') || currentPage.includes('experiment.html') || currentPage.includes('sports.html') || currentPage.includes('nature.html') || currentPage.includes('cs.html');
    const isContact = currentHash === '#contact';
    
    // Determine which academic sub-page is active
    const isCompetitions = currentPage.includes('competitions.html');
    const isLabProjects = currentPage.includes('lab-projects.html');
    
    // Determine which activity sub-page is active
    const isExperiment = currentPage.includes('experiment.html');
    const isSports = currentPage.includes('sports.html');
    const isNature = currentPage.includes('nature.html');
    const isCS = currentPage.includes('cs.html');

    return `
      <nav class="nav container">
        <a href="#" class="nav__logo">Guanlin Wang</a>
        <div class="nav__menu" id="nav-menu">
          <ul class="nav__list grid">
            <li class="nav__item">
              <a href="index.html" class="nav__link ${isHome ? 'active-link' : ''}">
                <i class="uil uil-book nav__icon"></i>
                <p i18n="home">Home</p>
              </a>
            </li>
            <li class="nav__item">
              <a href="about.html" class="nav__link ${isAbout ? 'active-link' : ''}">
                <i class="uil uil-file-alt nav__icon"></i>
                <p i18n="about">Resume</p>
              </a>
            </li>
            <li class="nav__item">
              <a href="coursework.html" class="nav__link ${isCoursework ? 'active-link' : ''}">
                <i class="uil uil-graduation-cap nav__icon"></i>
                <p i18n="portfolio">Coursework</p>
              </a>
            </li>
            <li class="nav__item nav__item--dropdown">
              <a href="academic.html" class="nav__link ${isAcademic ? 'active-link' : ''}">
                <i class="uil uil-book nav__icon"></i>
                <p i18n="portfolio">Academic</p>
                <i class="uil uil-angle-down nav__dropdown-icon"></i>
              </a>
              <ul class="nav__dropdown">
                <li><a href="competitions.html" class="${isCompetitions ? 'active' : ''}"><i class="uil uil-trophy"></i> Competitions</a></li>
                <li><a href="lab-projects.html" class="${isLabProjects ? 'active' : ''}"><i class="uil uil-flask"></i> Laboratory Projects</a></li>
              </ul>
            </li>
            <li class="nav__item">
              <a href="qualification.html" class="nav__link ${isQualification ? 'active-link' : ''}">
                <i class="uil uil-rocket nav__icon"></i>
                <p i18n="qualification">Future Plan</p>
              </a>
            </li>
            <li class="nav__item nav__item--dropdown">
              <a href="activities.html" class="nav__link ${isActivities ? 'active-link' : ''}">
                <i class="uil uil-smile nav__icon"></i>
                <p i18n="activities">Activities & Hobby</p>
                <i class="uil uil-angle-down nav__dropdown-icon"></i>
              </a>
              <ul class="nav__dropdown">
                <li><a href="experiment.html" class="${isExperiment ? 'active' : ''}"><i class="uil uil-flask"></i> Experiment</a></li>
                <li><a href="sports.html" class="${isSports ? 'active' : ''}"><i class="uil uil-basketball"></i> Sports</a></li>
                <li><a href="nature.html" class="${isNature ? 'active' : ''}"><i class="uil uil-mountains"></i> Nature</a></li>
                <li><a href="cs.html" class="${isCS ? 'active' : ''}"><i class="uil uil-game"></i> Counter Strike</a></li>
              </ul>
            </li>
            <li class="nav__item">
              <a href="#contact" class="nav__link ${isContact ? 'active-link' : ''}">
                <i class="uil uil-smile nav__icon"></i>
                <p i18n="contact">Contact me</p>
              </a>
            </li>
          </ul>
        </div>
        <div class="nav__btns">
          <i class="uil uil-moon change-theme" id="theme-button"></i>
          <div class="nav__toggle" id="nav-toggle">
            <i class="uil uil-apps"></i>
          </div>
        </div>
      </nav>
    `;
  }

  // Load navigation bar when DOM is ready
  function loadNavbar() {
    const header = document.querySelector('header');
    if (header) {
      const existingNav = header.querySelector('.nav');
      if (existingNav) {
        existingNav.outerHTML = getNavbarHTML();
      } else {
        header.innerHTML = getNavbarHTML();
      }
      
      // Re-initialize navigation toggle functionality
      const navToggle = document.getElementById('nav-toggle');
      const navMenu = document.getElementById('nav-menu');
      
      if (navToggle && navMenu) {
        // Remove existing event listeners by cloning
        const newNavToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newNavToggle, navToggle);
        
        // Add click event for mobile menu toggle
        newNavToggle.addEventListener('click', function() {
          navMenu.classList.toggle('show-menu');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
          link.addEventListener('click', function() {
            navMenu.classList.remove('show-menu');
          });
        });
      }
      
      // Re-initialize theme toggle
      const themeButton = document.getElementById('theme-button');
      if (themeButton) {
        // Remove existing listeners by cloning
        const newThemeButton = themeButton.cloneNode(true);
        themeButton.parentNode.replaceChild(newThemeButton, themeButton);
        
        // Add theme toggle functionality
        newThemeButton.addEventListener('click', function() {
          document.body.classList.toggle('dark-theme');
          const isDark = document.body.classList.contains('dark-theme');
          localStorage.setItem('selected-theme', isDark ? 'dark' : 'light');
        });
        
        // Apply saved theme
        const selectedTheme = localStorage.getItem('selected-theme');
        if (selectedTheme === 'dark') {
          document.body.classList.add('dark-theme');
        }
      }
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
  } else {
    loadNavbar();
  }

})();





(function() {
  'use strict';

  // Get current page name to set active link
  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.toLowerCase();
  }

  // Get current page hash for anchor links
  function getCurrentHash() {
    return window.location.hash;
  }

  // Navigation bar HTML template
  function getNavbarHTML() {
    const currentPage = getCurrentPage();
    const currentHash = getCurrentHash();
    
    // Determine active links
    const isHome = currentPage === 'index.html' || currentPage === '' || (currentPage.includes('index') && !currentHash);
    const isAbout = currentPage.includes('about.html');
    const isCoursework = currentPage.includes('coursework.html');
    const isAcademic = currentPage.includes('academic.html') || currentPage.includes('competitions.html') || currentPage.includes('lab-projects.html');
    const isQualification = currentPage.includes('qualification.html');
    const isActivities = currentPage.includes('activities.html') || currentPage.includes('experiment.html') || currentPage.includes('sports.html') || currentPage.includes('nature.html') || currentPage.includes('cs.html');
    const isContact = currentHash === '#contact';
    
    // Determine which academic sub-page is active
    const isCompetitions = currentPage.includes('competitions.html');
    const isLabProjects = currentPage.includes('lab-projects.html');
    
    // Determine which activity sub-page is active
    const isExperiment = currentPage.includes('experiment.html');
    const isSports = currentPage.includes('sports.html');
    const isNature = currentPage.includes('nature.html');
    const isCS = currentPage.includes('cs.html');

    return `
      <nav class="nav container">
        <a href="#" class="nav__logo">Guanlin Wang</a>
        <div class="nav__menu" id="nav-menu">
          <ul class="nav__list grid">
            <li class="nav__item">
              <a href="index.html" class="nav__link ${isHome ? 'active-link' : ''}">
                <i class="uil uil-book nav__icon"></i>
                <p i18n="home">Home</p>
              </a>
            </li>
            <li class="nav__item">
              <a href="about.html" class="nav__link ${isAbout ? 'active-link' : ''}">
                <i class="uil uil-file-alt nav__icon"></i>
                <p i18n="about">Resume</p>
              </a>
            </li>
            <li class="nav__item">
              <a href="coursework.html" class="nav__link ${isCoursework ? 'active-link' : ''}">
                <i class="uil uil-graduation-cap nav__icon"></i>
                <p i18n="portfolio">Coursework</p>
              </a>
            </li>
            <li class="nav__item nav__item--dropdown">
              <a href="academic.html" class="nav__link ${isAcademic ? 'active-link' : ''}">
                <i class="uil uil-book nav__icon"></i>
                <p i18n="portfolio">Academic</p>
                <i class="uil uil-angle-down nav__dropdown-icon"></i>
              </a>
              <ul class="nav__dropdown">
                <li><a href="competitions.html" class="${isCompetitions ? 'active' : ''}"><i class="uil uil-trophy"></i> Competitions</a></li>
                <li><a href="lab-projects.html" class="${isLabProjects ? 'active' : ''}"><i class="uil uil-flask"></i> Laboratory Projects</a></li>
              </ul>
            </li>
            <li class="nav__item">
              <a href="qualification.html" class="nav__link ${isQualification ? 'active-link' : ''}">
                <i class="uil uil-rocket nav__icon"></i>
                <p i18n="qualification">Future Plan</p>
              </a>
            </li>
            <li class="nav__item nav__item--dropdown">
              <a href="activities.html" class="nav__link ${isActivities ? 'active-link' : ''}">
                <i class="uil uil-smile nav__icon"></i>
                <p i18n="activities">Activities & Hobby</p>
                <i class="uil uil-angle-down nav__dropdown-icon"></i>
              </a>
              <ul class="nav__dropdown">
                <li><a href="experiment.html" class="${isExperiment ? 'active' : ''}"><i class="uil uil-flask"></i> Experiment</a></li>
                <li><a href="sports.html" class="${isSports ? 'active' : ''}"><i class="uil uil-basketball"></i> Sports</a></li>
                <li><a href="nature.html" class="${isNature ? 'active' : ''}"><i class="uil uil-mountains"></i> Nature</a></li>
                <li><a href="cs.html" class="${isCS ? 'active' : ''}"><i class="uil uil-game"></i> Counter Strike</a></li>
              </ul>
            </li>
            <li class="nav__item">
              <a href="#contact" class="nav__link ${isContact ? 'active-link' : ''}">
                <i class="uil uil-smile nav__icon"></i>
                <p i18n="contact">Contact me</p>
              </a>
            </li>
          </ul>
        </div>
        <div class="nav__btns">
          <i class="uil uil-moon change-theme" id="theme-button"></i>
          <div class="nav__toggle" id="nav-toggle">
            <i class="uil uil-apps"></i>
          </div>
        </div>
      </nav>
    `;
  }

  // Load navigation bar when DOM is ready
  function loadNavbar() {
    const header = document.querySelector('header');
    if (header) {
      const existingNav = header.querySelector('.nav');
      if (existingNav) {
        existingNav.outerHTML = getNavbarHTML();
      } else {
        header.innerHTML = getNavbarHTML();
      }
      
      // Re-initialize navigation toggle functionality
      const navToggle = document.getElementById('nav-toggle');
      const navMenu = document.getElementById('nav-menu');
      
      if (navToggle && navMenu) {
        // Remove existing event listeners by cloning
        const newNavToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newNavToggle, navToggle);
        
        // Add click event for mobile menu toggle
        newNavToggle.addEventListener('click', function() {
          navMenu.classList.toggle('show-menu');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
          link.addEventListener('click', function() {
            navMenu.classList.remove('show-menu');
          });
        });
      }
      
      // Re-initialize theme toggle
      const themeButton = document.getElementById('theme-button');
      if (themeButton) {
        // Remove existing listeners by cloning
        const newThemeButton = themeButton.cloneNode(true);
        themeButton.parentNode.replaceChild(newThemeButton, themeButton);
        
        // Add theme toggle functionality
        newThemeButton.addEventListener('click', function() {
          document.body.classList.toggle('dark-theme');
          const isDark = document.body.classList.contains('dark-theme');
          localStorage.setItem('selected-theme', isDark ? 'dark' : 'light');
        });
        
        // Apply saved theme
        const selectedTheme = localStorage.getItem('selected-theme');
        if (selectedTheme === 'dark') {
          document.body.classList.add('dark-theme');
        }
      }
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
  } else {
    loadNavbar();
  }

})();
