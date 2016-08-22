import tooltipType from "./TooltipType";

export const MARGIN = 15;
export const ARROW_RIGHT_MARGIN = 20;
export const ARROW_LEFT_MARGIN = 25;
export const ARROW_VERTICAL_MARGIN = 15;
export const ARROW_HEIGHT = 8;

export const getPosition = (positionType, target, tooltip, type) => {
    const positionTarget = target.getBoundingClientRect();
    const [tooltipPos, arrowPos] = positionType.split(" ");

    let top = 0;
    let left = 0;

    switch (tooltipPos) {
        case "bottom":
            top = positionTarget.height + (type === tooltipType.validation ? -1 : MARGIN);
            break;
        case "top":
            top = -tooltip.offsetHeight - MARGIN;
            break;
        case "right":
            left = positionTarget.width + (type === tooltipType.validation ? 0 : MARGIN);
            break;
        case "left":
            left = -tooltip.offsetWidth - (type === tooltipType.validation ? 0 : MARGIN);
            break;
    }

    switch (arrowPos) {
        case "center":
            left = positionTarget.width / 2 - tooltip.offsetWidth / 2;
            break;
        case "left":
            left = (type === tooltipType.validation ? 0 : -ARROW_LEFT_MARGIN);
            break;
        case "right":
            left = positionTarget.width - tooltip.offsetWidth + (type === tooltipType.validation ? 0 : ARROW_RIGHT_MARGIN);
            break;

        case "middle":
            top = (type === tooltipType.validation ? positionTarget.height : positionTarget.height / 2) - tooltip.offsetHeight / 2;
            break;
        case "top":
            top = (type === tooltipType.validation ? positionTarget.height - ARROW_HEIGHT : 0) - ARROW_VERTICAL_MARGIN;
            break;
        case "bottom":
            top = positionTarget.height - tooltip.offsetHeight + ARROW_VERTICAL_MARGIN + (type === tooltipType.validation ? ARROW_HEIGHT : 0);
            break;
    }

    return {
        top: `${top}px`,
        left: `${left}px`
    }
};

export const getPositionType = (positionType, target, tooltip, type, mainWrapper = document.getElementById("MainWrapper")) => {
    const positionTarget = target.getBoundingClientRect();
    let [tooltipPos, arrowPos] = positionType.split(" ");
    let margin = MARGIN;

    switch (tooltipPos) {
        case "bottom":
            margin = type === tooltipType.validation ? -1 : MARGIN;
            tooltipPos = (positionTarget.top + positionTarget.height + tooltip.offsetHeight + margin) <= mainWrapper.clientHeight ? tooltipPos : "top";
            break;
        case "top":
            tooltipPos = (positionTarget.top - tooltip.offsetHeight - margin) >= 0 ? tooltipPos : "bottom";
            break;
        case "right":
            margin = type === tooltipType.validation ? ARROW_HEIGHT : MARGIN;
            tooltipPos = (positionTarget.left + positionTarget.width + tooltip.offsetWidth + margin) <= mainWrapper.clientWidth ? tooltipPos : "left";
            break;
        case "left":
            margin = type === tooltipType.validation ? ARROW_HEIGHT : MARGIN;
            tooltipPos = positionTarget.left - (tooltip.offsetWidth + margin) >= 0 ? tooltipPos : "right";
            break;
    }

    switch (arrowPos) {
        case "center": {
            arrowPos =
                (positionTarget.left + positionTarget.width / 2 + tooltip.offsetWidth / 2) < mainWrapper.clientWidth &&
                (positionTarget.left + positionTarget.width / 2 - tooltip.offsetWidth / 2) >= 0 &&
                (positionTarget.left + positionTarget.width / 2 - tooltip.offsetWidth / 2) < mainWrapper.clientWidth
                    ? arrowPos
                    : (positionTarget.left + positionTarget.width / 2 + tooltip.offsetWidth / 2) > mainWrapper.clientWidth
                    ? "right"
                    : "left";
            break;
        }
        case "left": {
            arrowPos =
                (positionTarget.left - (type === tooltipType.validation ? 0 : ARROW_LEFT_MARGIN) + tooltip.offsetWidth) <= mainWrapper.clientWidth
                    ? arrowPos
                    : "right";
            break;
        }
        case "right": {
            arrowPos =
                (positionTarget.left + positionTarget.width - tooltip.offsetWidth + (type === tooltipType.validation ? 0 : ARROW_RIGHT_MARGIN)) >= 0
                    ? arrowPos
                    : "left";
            break;
        }
        case "middle": {
            const bottomLine = positionTarget.top +
                (type === tooltipType.validation ? positionTarget.height : positionTarget.height / 2) +
                tooltip.offsetHeight / 2;
            const topLine = positionTarget.top +
                (type === tooltipType.validation ? positionTarget.height : positionTarget.height / 2) -
                tooltip.offsetHeight / 2;
            arrowPos =
                bottomLine <= mainWrapper.clientHeight &&
                topLine >= 0
                    ? "middle"
                    : bottomLine > mainWrapper.clientHeight
                    ? "bottom"
                    : "top";
            break;
        }
        case "top": {
            const bottomLine = positionTarget.top +
                (type === tooltipType.validation ? positionTarget.height : positionTarget.height / 2) +
                tooltip.offsetHeight -
                ARROW_VERTICAL_MARGIN -
                ARROW_HEIGHT;
            arrowPos =
                bottomLine <= mainWrapper.clientHeight
                    ? arrowPos
                    : "bottom";
            break;
        }
        case "bottom": {
            const topLine = positionTarget.top +
                (type === tooltipType.validation ? positionTarget.height : positionTarget.height / 2) -
                tooltip.offsetHeight +
                ARROW_VERTICAL_MARGIN +
                ARROW_HEIGHT;
            arrowPos =
                topLine >= 0
                    ? arrowPos
                    : "top";
            break;
        }
    }

    return [tooltipPos, arrowPos].join(" ");
};
