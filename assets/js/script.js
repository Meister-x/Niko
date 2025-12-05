/**
 * 图片轮播控制
 * 处理幻灯片的前一张/后一张切换
 */

/**
 * 切换到下一张图片
 */
function slideNext() {
  const slideContainer = document.getElementById('slide');
  const items = document.querySelectorAll('.item');
  
  if (slideContainer && items.length > 0) {
    slideContainer.appendChild(items[0]);
}
}

/**
 * 切换到上一张图片
 */
function slidePrev() {
  const slideContainer = document.getElementById('slide');
  const items = document.querySelectorAll('.item');
  
  if (slideContainer && items.length > 0) {
    slideContainer.prepend(items[items.length - 1]);
  }
}

// 初始化轮播控制按钮
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

if (nextButton) {
  nextButton.addEventListener('click', slideNext);
}

if (prevButton) {
  prevButton.addEventListener('click', slidePrev);
}