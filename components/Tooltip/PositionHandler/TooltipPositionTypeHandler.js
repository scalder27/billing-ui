import tooltipType from "../TooltipType";
import {
    MARGIN,
    ARROW_RIGHT_MARGIN,
    ARROW_LEFT_MARGIN,
    ARROW_VERTICAL_MARGIN,
    ARROW_HEIGHT
} from "./index";

export const getTooltipPositionType = (tooltipPos, positionTarget, tooltip, type, mainWrapper) => {
    switch (tooltipPos) {
        case "bottom": {
            const margin = type === tooltipType.validation ? -1 : MARGIN;
            return (positionTarget.top + positionTarget.height + tooltip.offsetHeight + margin) <= mainWrapper.clientHeight
                ? tooltipPos
                : "top";
        }
        case "top": {
            return (positionTarget.top - tooltip.offsetHeight - MARGIN) >= 0
                ? tooltipPos
                : "bottom";
        }
        case "right": {
            const margin = type === tooltipType.validation ? ARROW_HEIGHT : MARGIN;
            return (positionTarget.left + positionTarget.width + tooltip.offsetWidth + margin) <= mainWrapper.clientWidth
                ? tooltipPos
                : "left";
        }
        case "left": {
            const margin = type === tooltipType.validation ? ARROW_HEIGHT : MARGIN;
            return (positionTarget.left - (tooltip.offsetWidth + margin)) >= 0
                ? tooltipPos
                : "right";
        }
    }
};

export const getArrowPositionType = (arrowPos, positionTarget, tooltip, type, mainWrapper) => {
    switch (arrowPos) {
        case "center": {
            const rightLine = positionTarget.left + positionTarget.width / 2 + tooltip.offsetWidth / 2;
            const leftLine = positionTarget.left + positionTarget.width / 2 - tooltip.offsetWidth / 2;

            return (
                rightLine < mainWrapper.clientWidth &&
                leftLine >= 0
                    ? arrowPos
                    : rightLine > mainWrapper.clientWidth
                    ? "right"
                    : "left"
            )
        }
        case "left": {
            const leftMargin = type === tooltipType.validation ? 0 : ARROW_LEFT_MARGIN;
            const rightLine = positionTarget.left - leftMargin + tooltip.offsetWidth;

            return rightLine <= mainWrapper.clientWidth
                ? arrowPos
                : "right";
        }
        case "right": {
            const rightMargin = type === tooltipType.validation ? 0 : ARROW_RIGHT_MARGIN;
            const leftLine = positionTarget.left + positionTarget.width - tooltip.offsetWidth + rightMargin;

            return leftLine >= 0
                ? arrowPos
                : "left";
        }
        case "middle": {
            const arrowPoints = type === tooltipType.validation ? positionTarget.height : positionTarget.height / 2;
            const bottomLine = positionTarget.top + arrowPoints + tooltip.offsetHeight / 2;
            const topLine = positionTarget.top + arrowPoints - tooltip.offsetHeight / 2;

            return (
                bottomLine <= mainWrapper.clientHeight &&
                topLine >= 0
                    ? "middle"
                    : bottomLine > mainWrapper.clientHeight
                    ? "bottom"
                    : "top"
            )
        }
        case "top": {
            const arrowPoints = type === tooltipType.validation ? positionTarget.height : positionTarget.height / 2;
            const bottomLine = positionTarget.top + arrowPoints + tooltip.offsetHeight - ARROW_VERTICAL_MARGIN - ARROW_HEIGHT;

            return bottomLine <= mainWrapper.clientHeight
                ? arrowPos
                : "bottom";
        }
        case "bottom": {
            const arrowPoints = type === tooltipType.validation ? positionTarget.height : positionTarget.height / 2;
            const topLine = positionTarget.top + arrowPoints - tooltip.offsetHeight + ARROW_VERTICAL_MARGIN + ARROW_HEIGHT;

            return topLine >= 0
                ? arrowPos
                : "top";
        }
    }
};
