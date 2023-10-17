export function scrollToTop(scroll: HTMLElement) {
  scroll.scrollTop = 0;
}

export function scrollToBottom(scroll: HTMLElement) {
  let scrollTop = scroll.scrollHeight - scroll.clientHeight;
  scroll.scrollTop = scrollTop > 0 ? scrollTop : 0;
}

export function scrollToLeft(scroll: HTMLElement) {
  scroll.scrollLeft = 0;
}

export function scrollToRight(scroll: HTMLElement) {
  let scrollLeft = scroll.scrollWidth - scroll.clientWidth;
  scroll.scrollLeft = scrollLeft > 0 ? scrollLeft : 0;
}

export function draggable(dom: HTMLElement) {
  let parent = dom.parentElement;
  if (!parent) {
    console.warn('parentElement not found');
    return;
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
    close() {
      isDraggable = false;
    },
    open() {
      isDraggable = true;
    },
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