const MARGIN = 15;
const ARROW_RIGHT_MARGIN = 20;
const ARROW_LEFT_MARGIN = 25;
const ARROW_VERTICAL_MARGIN = 15;

export const getPosition = (positionType, target, tooltip) => {
    const positionTarget = target.getBoundingClientRect();
    const [tooltipPos, arrowPos] = positionType.split(" ");

    let top = 0;
    let left = 0;

    switch (tooltipPos) {
        case "bottom":
            top = positionTarget.height + MARGIN;
            break;
        case "top":
            top = -tooltip.offsetHeight - MARGIN;
            break;
        case "right":
            left = positionTarget.width + MARGIN;
            break;
        case "left":
            left = tooltip.offsetWidth - MARGIN;
            break;
    }

    switch (arrowPos) {
        case "center":
            left = positionTarget.width / 2 - tooltip.offsetWidth / 2;
            break;
        case "left":
            left = -ARROW_LEFT_MARGIN;
            break;
        case "right":
            left = positionTarget.width - tooltip.offsetWidth + ARROW_RIGHT_MARGIN;
            break;

        case "middle":
            top = positionTarget.height / 2 - tooltip.offsetHeight / 2;
            break;
        case "top":
            top = -ARROW_VERTICAL_MARGIN;
            break;
        case "bottom":
            top = positionTarget.height - tooltip.offsetHeight + ARROW_VERTICAL_MARGIN;
            break;
    }

    return {
        top: `${top}px`,
        left: `${left}px`
    }
};

export const getPositionType = (positionType, target, tooltip, wrapper) => {
    const positionTarget = target.getBoundingClientRect();
    const mainWrapper = wrapper || document.getElementById("MainWrapper");
    let [tooltipPos, arrowPos] = positionType.split(" ");

    switch (tooltipPos) {
        case "bottom":
            tooltipPos = (positionTarget.top + positionTarget.height + tooltip.offsetHeight + MARGIN) < mainWrapper.clientHeight ? tooltipPos : "top";
            break;
        case "top":
            tooltipPos = (tooltip.offsetHeight + MARGIN) < positionTarget.top ? tooltipPos : "bottom";
            break;
        case "right":
            tooltipPos = (positionTarget.left + positionTarget.width + tooltip.offsetWidth + MARGIN) < mainWrapper.clientWidth ? tooltipPos : "left";
            break;
        case "left":
            tooltipPos = (tooltip.offsetWidth + MARGIN) < positionTarget.left ? tooltipPos : "right";
            break;
    }

    switch (arrowPos) {
        case "center":
            arrowPos =
                (positionTarget.left + positionTarget.width / 2 + tooltip.offsetWidth / 2) < mainWrapper.clientWidth &&
                (positionTarget.left + positionTarget.width / 2 - tooltip.offsetWidth / 2) >= 0 &&
                (positionTarget.left + positionTarget.width / 2 - tooltip.offsetWidth / 2) < mainWrapper.clientWidth
                    ? arrowPos
                    : (positionTarget.left + positionTarget.width / 2 + tooltip.offsetWidth / 2) > mainWrapper.clientWidth
                    ? "right"
                    : "left";
            break;
        case "left":
            arrowPos =
                (positionTarget.left - ARROW_LEFT_MARGIN + tooltip.offsetWidth) < mainWrapper.clientWidth
                    ? arrowPos
                    : "right";
            break;
        case "right":
            arrowPos =
                (positionTarget.left + positionTarget.width - tooltip.offsetWidth + ARROW_RIGHT_MARGIN) >= 0
                    ? arrowPos
                    : "left";
            break;
        case "middle":
            arrowPos =
                (positionTarget.top + positionTarget.height / 2 + tooltip.offsetHeight / 2) < mainWrapper.clientHeight &&
                (positionTarget.top + positionTarget.height / 2 - tooltip.offsetHeight / 2) >= 0 &&
                (positionTarget.top + positionTarget.height / 2 - tooltip.offsetHeight / 2) < mainWrapper.clientHeight
                    ? "middle"
                    : (positionTarget.top + positionTarget.height / 2 + tooltip.offsetHeight / 2) > mainWrapper.clientHeight
                    ? "bottom"
                    : "top";
            break;
        case "top":
            arrowPos =
                (positionTarget.top + positionTarget.height / 2 + tooltip.offsetHeight / 2) < mainWrapper.clientHeight
                    ? arrowPos
                    : "bottom";
            break;
        case "bottom":
            arrowPos =
                (positionTarget.top + positionTarget.height / 2 - tooltip.offsetHeight / 2) >= 0
                    ? arrowPos
                    : "top";
            break;
    }

    return [tooltipPos, arrowPos].join(" ");
};
