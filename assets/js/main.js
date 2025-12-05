/*==================== MENU SHOW Y HIDDEN ====================*/
/**
 * 导航菜单控制模块
 * 处理移动端菜单的显示和隐藏
 */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/**
 * 显示菜单
 */
function showMenu() {
  if (navMenu) {
    navMenu.classList.add('show-menu');
  }
}

/**
 * 隐藏菜单
 */
function hideMenu() {
  if (navMenu) {
    navMenu.classList.remove('show-menu');
  }
}

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener('click', showMenu);
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener('click', hideMenu);
}

/*==================== REMOVE MENU MOBILE ====================*/
/**
 * 移动端菜单链接点击处理
 * 点击链接后自动关闭菜单
 */
const navLinks = document.querySelectorAll('.nav__link');

/**
 * 处理链接点击事件
 */
function handleLinkClick() {
  hideMenu();
}

// 为所有导航链接添加点击事件
navLinks.forEach(link => {
  link.addEventListener('click', handleLinkClick);
});

/*==================== SKILLS PROGRESS BAR ANIMATION ====================*/
/**
 * 技能进度条动画
 * 根据百分数动态设置进度条宽度，并添加动画效果
 */
function initSkillsProgress() {
  const progressBars = document.querySelectorAll('.skills__percentage[data-percentage]');
  
  // 使用 Intersection Observer 来检测进度条是否进入视口
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const percentage = entry.target.getAttribute('data-percentage');
        if (percentage) {
          // 设置进度条宽度，触发CSS动画
          entry.target.style.width = percentage + '%';
        }
        // 动画完成后取消观察
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 观察所有进度条
  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}

// 页面加载完成后初始化进度条动画
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSkillsProgress);
} else {
  initSkillsProgress();
}

/*==================== COUNTER ANIMATION ====================*/
/**
 * 数字计数动画
 * 使用更平滑的缓动函数和 requestAnimationFrame 实现丝滑流畅的动画效果
 */
(function(){
  const counters = document.querySelectorAll('.count');
  
  // 使用 easeOutQuart 缓动函数，比 cubic 更平滑
  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
  
  // 更平滑的 easeOutExpo 缓动函数
  const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  
  const run = el => {
    const end = parseFloat(el.dataset.end || '0');
    const decimals = parseInt(el.dataset.decimals || '0');
    
    // 根据数字大小动态调整动画时长
    // 基础时长 600ms，每增加1个单位增加 200ms
    // 例如：1 -> 800ms, 2 -> 1000ms, 5 -> 1400ms
    const baseDuration = 600;
    const durationPerUnit = 200;
    const duration = Math.min(2000, baseDuration + (end * durationPerUnit)); // 最长不超过2秒
    
    const startTime = performance.now();
    let lastValue = -1; // 用于避免重复更新相同值
    
    function tick(now){
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      // 使用 easeOutExpo 获得更平滑的效果
      const eased = easeOutExpo(progress);
      const currentValue = end * eased;
      const val = parseFloat(currentValue.toFixed(decimals));
      
      // 只有当值发生变化时才更新，提高性能
      if (val !== lastValue) {
        el.textContent = val.toFixed(decimals);
        lastValue = val;
      }
      
      if(progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // 确保最终值精确
        el.textContent = end.toFixed(decimals);
      }
    }
    requestAnimationFrame(tick);
  };
  
  // 进入视口再触发
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        run(e.target); 
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.3});
  
  counters.forEach(c => io.observe(c));
})();

/*==================== QUALIFICATION TABS ====================*/
/**
 * 资格/经历标签页切换
 * 处理标签页之间的切换逻辑
 */
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

/**
 * 处理标签页点击
 * @param {HTMLElement} clickedTab - 被点击的标签页元素
 */
function handleTabClick(clickedTab) {
  const targetSelector = clickedTab.dataset.target;
  const targetContent = document.querySelector(targetSelector);

  if (!targetContent) return;

  // 移除所有标签页和内容的活动状态
  tabContents.forEach(content => {
    content.classList.remove('qualification__active');
  });

  tabs.forEach(tab => {
    tab.classList.remove('qualification__active');
  });

  // 添加当前标签页和内容的活动状态
  targetContent.classList.add('qualification__active');
  clickedTab.classList.add('qualification__active');
}

// 为所有标签页添加点击事件
tabs.forEach(tab => {
  tab.addEventListener('click', () => handleTabClick(tab));
});


/*==================== PORTFOLIO SWIPER  ====================*/
/**
 * 作品集轮播图初始化
 * 使用 Swiper.js 实现平滑的轮播效果
 */
let swiperPortfolio;

// 仅在 Swiper 可用时初始化
if (typeof Swiper !== 'undefined') {
  const portfolioContainer = document.querySelector('.portfolio__container');
  
  if (portfolioContainer) {
    swiperPortfolio = new Swiper('.portfolio__container', {
      cssMode: true,
      loop: true,
      speed: 600, // 平滑的过渡速度
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      // 启用触摸和鼠标拖动
      touchEventsTarget: 'container',
      grabCursor: true,
    });
  }
}


/*==================== UTILITY FUNCTIONS ====================*/
/**
 * 节流函数 - 限制函数执行频率
 * @param {Function} func - 要节流的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
/**
 * 滚动时高亮当前区域的导航链接
 * 使用节流函数优化性能
 */
const sections = document.querySelectorAll('section[id]');

/**
 * 更新当前激活的导航链接
 */
function updateActiveLink() {
  const scrollY = window.pageYOffset;
  const viewportCenter = window.innerHeight / 2;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100; // 偏移量调整
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

    if (navLink) {
      if (scrollY + viewportCenter >= sectionTop && 
          scrollY + viewportCenter < sectionTop + sectionHeight) {
        // 移除所有活动链接
        document.querySelectorAll('.nav__link').forEach(link => {
          link.classList.remove('active-link');
        });
        // 添加当前活动链接
        navLink.classList.add('active-link');
      }
    }
  });
}

// 使用节流优化滚动事件
window.addEventListener('scroll', throttle(updateActiveLink, 100));

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
/**
 * 滚动时改变头部背景
 * 当页面滚动超过80px时添加阴影效果
 */
function updateScrollHeader() {
  const nav = document.getElementById('header');
  if (!nav) return;

  if (window.scrollY >= 80) {
    nav.classList.add('scroll-header');
  } else {
    nav.classList.remove('scroll-header');
  }
}

// 使用节流优化滚动事件
window.addEventListener('scroll', throttle(updateScrollHeader, 50));

/*==================== SHOW SCROLL UP ====================*/ 
/**
 * 显示/隐藏返回顶部按钮
 * 当页面滚动超过560px时显示按钮
 */
function toggleScrollUp() {
  const scrollUpBtn = document.getElementById('scroll-up');
  if (!scrollUpBtn) return;

  if (window.scrollY >= 560) {
    scrollUpBtn.classList.add('show-scroll');
  } else {
    scrollUpBtn.classList.remove('show-scroll');
  }
}

/**
 * 平滑滚动到顶部
 */
function scrollToTop(event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// 使用节流优化滚动事件
window.addEventListener('scroll', throttle(toggleScrollUp, 50));

// 为返回顶部按钮添加点击事件
const scrollUpBtn = document.getElementById('scroll-up');
if (scrollUpBtn) {
  scrollUpBtn.addEventListener('click', scrollToTop);
}

/*==================== DARK LIGHT THEME ====================*/
/**
 * 深色/浅色主题切换
 * 支持本地存储用户偏好设置
 */

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

/**
 * 获取当前主题
 * @returns {string} 'dark' 或 'light'
 */
function getCurrentTheme() {
  return document.body.classList.contains(darkTheme) ? 'dark' : 'light';
}

/**
 * 获取当前图标主题
 * @returns {string} 图标类名
 */
function getCurrentIcon() {
  return themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';
}

/**
 * 初始化主题
 * 从本地存储中读取用户之前的主题选择
 */
function initTheme() {
  if (!themeButton) return;

  const selectedTheme = localStorage.getItem('selected-theme');
  const selectedIcon = localStorage.getItem('selected-icon');

  if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
  }
}

/**
 * 切换主题
 */
function toggleTheme() {
  if (!themeButton) return;

  // 切换主题和图标
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  // 保存用户选择
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
}

// 初始化主题
initTheme();

// 为主题切换按钮添加点击事件
if (themeButton) {
  themeButton.addEventListener('click', toggleTheme);
}

/*==================== SCROLL ANIMATIONS ====================*/
/**
 * 滚动时触发元素淡入动画
 * 使用 Intersection Observer API 优化性能
 */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in-up');
  
  if (fadeElements.length === 0) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // 观察后取消观察，避免重复触发
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// 页面加载完成后初始化滚动动画
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}