/**
 * 图片轮播控制
 * 处理幻灯片的前一张/后一张切换
 * 支持多个轮播实例
 */

/**
 * 切换到下一张图片
 * @param {string} slideId - 轮播容器的ID
 */
function slideNext(slideId) {
  const slideContainer = document.getElementById(slideId);
  if (!slideContainer) return;
  
  const items = slideContainer.querySelectorAll('.coursework__item, .item');
  
  if (items.length > 0) {
    slideContainer.appendChild(items[0]);
    // 更新显示状态
    updateSlideItems(slideContainer);
}
}

/**
 * 切换到上一张图片
 * @param {string} slideId - 轮播容器的ID
 */
function slidePrev(slideId) {
  const slideContainer = document.getElementById(slideId);
  if (!slideContainer) return;
  
  const items = slideContainer.querySelectorAll('.coursework__item, .item');
  
  if (items.length > 0) {
    slideContainer.prepend(items[items.length - 1]);
    // 更新显示状态
    updateSlideItems(slideContainer);
  }
}

/**
 * 更新轮播项的显示状态
 * @param {HTMLElement} container - 轮播容器
 */
function updateSlideItems(container) {
  const items = container.querySelectorAll('.coursework__item, .item');
  items.forEach((item, index) => {
    if (index === 0) {
      item.style.opacity = '1';
      item.style.zIndex = '2';
    } else {
      item.style.opacity = '0';
      item.style.zIndex = '1';
    }
  });
}

// 自动轮播定时器存储
const autoSlideTimers = new Map();

/**
 * 启动自动轮播
 * @param {string} slideId - 轮播容器的ID
 * @param {number} interval - 轮播间隔（毫秒），默认4000ms
 */
function startAutoSlide(slideId, interval = 4000) {
  // 如果已经有定时器，先清除
  if (autoSlideTimers.has(slideId)) {
    clearInterval(autoSlideTimers.get(slideId));
  }
  
  // 创建新的定时器
  const timer = setInterval(() => {
    slideNext(slideId);
  }, interval);
  
  autoSlideTimers.set(slideId, timer);
}

/**
 * 停止自动轮播
 * @param {string} slideId - 轮播容器的ID
 */
function stopAutoSlide(slideId) {
  if (autoSlideTimers.has(slideId)) {
    clearInterval(autoSlideTimers.get(slideId));
    autoSlideTimers.delete(slideId);
  }
}

// 初始化所有轮播控制按钮
function initSlides() {
  // 支持旧的单个轮播（experiment.html等）
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

  if (nextButton && prevButton) {
    nextButton.addEventListener('click', () => {
      const slideContainer = document.getElementById('slide');
      if (slideContainer) {
        slideNext('slide');
        // 重置自动轮播
        stopAutoSlide('slide');
        startAutoSlide('slide');
}
    });
    
    prevButton.addEventListener('click', () => {
      const slideContainer = document.getElementById('slide');
      if (slideContainer) {
        slidePrev('slide');
        // 重置自动轮播
        stopAutoSlide('slide');
        startAutoSlide('slide');
      }
    });
  }
  
  // 支持新的多个轮播（coursework项目）
  const courseworkNextButtons = document.querySelectorAll('.coursework__next');
  const courseworkPrevButtons = document.querySelectorAll('.coursework__prev');
  
  courseworkNextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const slideId = button.getAttribute('data-slide');
      if (slideId) {
        slideNext(slideId);
        // 重置自动轮播
        stopAutoSlide(slideId);
        startAutoSlide(slideId);
      }
    });
  });
  
  courseworkPrevButtons.forEach(button => {
    button.addEventListener('click', () => {
      const slideId = button.getAttribute('data-slide');
      if (slideId) {
        slidePrev(slideId);
        // 重置自动轮播
        stopAutoSlide(slideId);
        startAutoSlide(slideId);
      }
    });
  });
  
  // 初始化所有轮播的显示状态
  document.querySelectorAll('.coursework__slide, #slide').forEach(container => {
    updateSlideItems(container);
    
    // 为每个轮播启动自动轮播
    if (container.id) {
      startAutoSlide(container.id, 4000); // 每4秒切换一次
    }
  });
  
  // 鼠标悬停时暂停自动轮播，移开时恢复
  document.querySelectorAll('.coursework__hero').forEach(hero => {
    const slide = hero.querySelector('.coursework__slide');
    const slideId = slide?.id;
    if (slideId) {
      hero.addEventListener('mouseenter', () => {
        stopAutoSlide(slideId);
      });
      
      hero.addEventListener('mouseleave', () => {
        startAutoSlide(slideId);
      });
    }
  });
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSlides);
} else {
  initSlides();
}
