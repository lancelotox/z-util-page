"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollToTop = scrollToTop;
exports.scrollToBottom = scrollToBottom;
exports.scrollToLeft = scrollToLeft;
exports.scrollToRight = scrollToRight;
exports.draggable = draggable;
function scrollToTop(scroll) {
    scroll.scrollTop = 0;
}
function scrollToBottom(scroll) {
    let scrollTop = scroll.scrollHeight - scroll.clientHeight;
    scroll.scrollTop = scrollTop > 0 ? scrollTop : 0;
}
function scrollToLeft(scroll) {
    scroll.scrollLeft = 0;
}
function scrollToRight(scroll) {
    let scrollLeft = scroll.scrollWidth - scroll.clientWidth;
    scroll.scrollLeft = scrollLeft > 0 ? scrollLeft : 0;
}
function draggable(dom) {
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
        isDraggable && (parent === null || parent === void 0 ? void 0 : parent.addEventListener("mousemove", mouseMove));
    });
    window.addEventListener("mouseup", function () {
        parent === null || parent === void 0 ? void 0 : parent.removeEventListener("mousemove", mouseMove);
    });
    function mouseMove(e) {
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
        wrap(dom) {
            dom.addEventListener('mousedown', function () {
                isDraggable = false;
            });
            window.addEventListener('mouseup', function () {
                isDraggable = true;
            });
        }
    };
}
