import tooltipType from "../TooltipType";
import {
    MARGIN,
    ARROW_RIGHT_MARGIN,
    ARROW_LEFT_MARGIN,
    ARROW_VERTICAL_MARGIN,
    ARROW_HEIGHT
} from "./index";

export const getTopPosition = (positionType, positionTarget, tooltip, type, { bottom = 0, top = 0 }) => {
    const [tooltipPos, arrowPos] = positionType.split(" ");

    switch (tooltipPos) {
        case "bottom": {
            const bottomMargin = type === tooltipType.validation ? -1 : MARGIN;
            return positionTarget.height + bottomMargin + bottom;
        }
        case "top": {
            return -tooltip.offsetHeight - MARGIN + top;
        }
    }

    switch (arrowPos) {
        case "middle": {
            const arrowPoints = type === tooltipType.validation ? positionTarget.height : positionTarget.height / 2;
            return arrowPoints - tooltip.offsetHeight / 2 + top;
        }
        case "top": {
            const arrowPoints = type === tooltipType.validation ? positionTarget.height - ARROW_HEIGHT : 0;
            return arrowPoints - ARROW_VERTICAL_MARGIN + top;
        }
        case "bottom": {
            const arrowVerticalMargin = ARROW_VERTICAL_MARGIN + (type === tooltipType.validation ? ARROW_HEIGHT : 0);
            return positionTarget.height - tooltip.offsetHeight + arrowVerticalMargin + bottom;
        }
    }
};

export const getLeftPosition = (positionType, positionTarget, tooltip, type, { right = 0, left = 0 }) => {
    const [tooltipPos, arrowPos] = positionType.split(" ");
    const margin = type === tooltipType.validation ? 0 : MARGIN;

    switch (tooltipPos) {
        case "right":
            return positionTarget.width + margin + right;
        case "left":
            return -tooltip.offsetWidth - margin + left;
    }

    switch (arrowPos) {
        case "center":
            return positionTarget.width / 2 - tooltip.offsetWidth / 2 + left;
        case "left":
            return type === tooltipType.validation ? 0 : -ARROW_LEFT_MARGIN + left;
        case "right":
            const rightMargin = type === tooltipType.validation ? 0 : ARROW_RIGHT_MARGIN;
            return positionTarget.width - tooltip.offsetWidth + rightMargin + right;
    }
};
