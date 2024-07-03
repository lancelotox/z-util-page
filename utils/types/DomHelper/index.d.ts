export declare function scrollToTop(scroll: HTMLElement): void;
export declare function scrollToBottom(scroll: HTMLElement): void;
export declare function scrollToLeft(scroll: HTMLElement): void;
export declare function scrollToRight(scroll: HTMLElement): void;
export declare function draggable(dom: HTMLElement): {
    close(): void;
    open(): void;
    wrap(dom: HTMLElement): void;
} | undefined;
