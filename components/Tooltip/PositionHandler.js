const MARGIN = 15;
const ARROW_RIGHT_MARGIN = 20;
const ARROW_LEFT_MARGIN = 25;
const ARROW_VERTICAL_MARGIN = 15;

export const getPosition = (positionType, target, tooltip) => {
    const positionTarget = target.getBoundingClientRect();
    const documentElement = document.body;
    const scrollTop = documentElement.scrollTop;
    const scrollLeft = documentElement.scrollLeft;
    const position = positionType.split(" ");

    let top = 0;
    let left = 0;

    switch (position[0]) {
        case "bottom":
            top = scrollTop + positionTarget.top + positionTarget.height + MARGIN;
            break;
        case "top":
            top = scrollTop + positionTarget.top - tooltip.offsetHeight - MARGIN;
            break;
        case "right":
            left = scrollLeft + positionTarget.left + positionTarget.width + MARGIN;
            break;
        case "left":
            left = scrollLeft + positionTarget.left - tooltip.offsetWidth - MARGIN;
            break;
    }

    switch (position[1]) {
        case "center":
            left = scrollLeft + positionTarget.left + positionTarget.width / 2 - tooltip.offsetWidth / 2;
            break;
        case "left":
            left = scrollLeft + positionTarget.left - ARROW_LEFT_MARGIN;
            break;
        case "right":
            left = scrollLeft + positionTarget.left + positionTarget.width - tooltip.offsetWidth + ARROW_RIGHT_MARGIN;
            break;

        case "middle":
            top = scrollTop + positionTarget.top + positionTarget.height / 2 - tooltip.offsetHeight / 2;
            break;
        case "top":
            top = scrollTop + positionTarget.top - ARROW_VERTICAL_MARGIN;
            break;
        case "bottom":
            top = top = scrollTop + positionTarget.top + positionTarget.height - tooltip.offsetHeight + ARROW_VERTICAL_MARGIN;
            break;
    }

    return {
        top: `${top}px`,
        left: `${left}px`
    }
};
