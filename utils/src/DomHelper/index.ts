/**
 * @module DomHelper
 * @category DOM操作辅助类
 */

/**
 * 将可滚动元素滚动到顶部
 * @example
 * ```ts
 * scrollToTop(dom: HTMLElement);
 * ```
 * @param scroll 要滚动的元素
 */
export function scrollToTop(scroll: HTMLElement) {
  scroll.scrollTop = 0;
}

/**
 * 将可滚动元素滚动到底部
 * @example
 * ```ts
 * scrollToBottom(dom: HTMLElement);
 * ```
 * @param scroll 要滚动的元素
 */
export function scrollToBottom(scroll: HTMLElement) {
  let scrollTop = scroll.scrollHeight - scroll.clientHeight;
  scroll.scrollTop = scrollTop > 0 ? scrollTop : 0;
}

/**
 * 将可滚动元素滚动到最左侧
 * @example
 * ```ts
 * scrollToLeft(dom: HTMLElement);
 * ```
 * @param scroll 要滚动的元素
 */
export function scrollToLeft(scroll: HTMLElement) {
  scroll.scrollLeft = 0;
}

/**
 * 将可滚动元素滚动到最右侧
 * @example
 * ```ts
 * scrollToRight(dom: HTMLElement);
 * ```
 * @param scroll 要滚动的元素
 */
export function scrollToRight(scroll: HTMLElement) {
  let scrollLeft = scroll.scrollWidth - scroll.clientWidth;
  scroll.scrollLeft = scrollLeft > 0 ? scrollLeft : 0;
}

/**
 * 将一个元素处理为可拖动元素
 * @example
 * ```ts
 * const handle = draggable(dom: HTMLElement);
 * // 关闭拖动功能
 * handle.close();
 * // 开启拖动功能
 * handle.open();
 * // 指定一个子元素，当该鼠标按下该元素时，关闭拖动功能，鼠标抬起后恢复拖动功能
 * handle.wrap(dom: HTMLElement);
 * ```
 * @param dom 要处理的元素
 */
export function draggable(dom: HTMLElement) {
  let parent = dom.parentElement;
  if (!parent) {
    console.warn('parentElement not found');
    return false;
  }
  
  let isDraggable = true;

  dom.style.position = 'absolute';

  let rect = dom.getBoundingClientRect();
  let geometry = {
    x: rect.x,
    y: rect.y,
    left: rect.left,
    top: rect.top,
  };

  dom.addEventListener("mousedown", function (e) {
    geometry.x = e.clientX;
    geometry.y = e.clientY;
    isDraggable && parent?.addEventListener("mousemove", mouseMove);
  });

  window.addEventListener("mouseup", function () {
    parent?.removeEventListener("mousemove", mouseMove);
  });

  function mouseMove(e: MouseEvent) {
    let skewX = e.clientX - geometry.x;
    let skewY = e.clientY - geometry.y;

    geometry.left += skewX;
    geometry.top += skewY;

    dom.style.left = geometry.left + "px";
    dom.style.top = geometry.top + "px";

    geometry.x = e.clientX;
    geometry.y = e.clientY;
  }

  return {
    /**
     * 关闭拖动功能
     */
    close() {
      isDraggable = false;
    },
    /**
     * 开启拖动功能
     */
    open() {
      isDraggable = true;
    },
    /**
     * 指定一个子元素，当该鼠标按下该元素时，关闭拖动功能，鼠标抬起后恢复拖动功能
     * @param dom 要处理的元素
     */
    wrap(dom: HTMLElement) {
      dom.addEventListener('mousedown', function () {
        isDraggable = false;
      });
      window.addEventListener('mouseup', function () {
        isDraggable = true;
      });
    }
  }
}