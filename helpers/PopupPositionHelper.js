export const fixYPopupPosition = (element) => {
    const elementInWindowPosY = element.getBoundingClientRect().top;
    const elementInWindowBottomPosY = element.getBoundingClientRect().bottom;
    const elementInParentPosY = Number.parseInt(element.style.top) || 0;

    let fixedElementInParentPosY = elementInParentPosY;

    if (elementInWindowPosY <= 0 && elementInWindowBottomPosY >= window.innerHeight) {
        return;
    } else if (elementInWindowPosY < 0) {
        fixedElementInParentPosY = elementInParentPosY - elementInWindowPosY;
    } else if (elementInWindowBottomPosY > window.innerHeight) {
        fixedElementInParentPosY = elementInParentPosY - (elementInWindowBottomPosY - window.innerHeight);
    }
    element.style.top = `${fixedElementInParentPosY}px`;
};
