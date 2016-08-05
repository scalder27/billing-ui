export const fixYPopupPosition = (element) => {
    const elementInWindowPosY = element.getBoundingClientRect().top;
    const elementInWindowBottomPosY = element.getBoundingClientRect().bottom;
    const elementInParentPosY = Number.parseInt(element.style.top) || 0;

    if (elementInWindowPosY <= 0 && elementInWindowBottomPosY >= window.innerHeight) {
        return `${elementInParentPosY}px`;
    }

    if (elementInWindowPosY < 0) {
        return `${elementInParentPosY - elementInWindowPosY}px`;
    }

    if (elementInWindowBottomPosY > window.innerHeight) {
        return `${elementInParentPosY - (elementInWindowBottomPosY - window.innerHeight)}px`;
    }
};
