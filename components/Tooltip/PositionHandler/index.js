import { getTopPosition, getLeftPosition } from "./TooltipPositionHandler";
import { getTooltipPositionType, getArrowPositionType } from "./TooltipPositionTypeHandler";

export const MARGIN = 15;
export const ARROW_RIGHT_MARGIN = 20;
export const ARROW_LEFT_MARGIN = 25;
export const ARROW_VERTICAL_MARGIN = 15;
export const ARROW_HEIGHT = 8;

export const getPosition = (positionType, target, tooltip, type) => {
    const positionTarget = target.getBoundingClientRect();
    return {
        top: `${getTopPosition(positionType, positionTarget, tooltip, type)}px`,
        left: `${getLeftPosition(positionType, positionTarget, tooltip, type)}px`
    }
};

export const getPositionType = (positionType, target, tooltip, type, mainWrapper = document.getElementById("MainWrapper")) => {
    const positionTarget = target.getBoundingClientRect();
    let [tooltipPos, arrowPos] = positionType.split(" ");

    return [
        getTooltipPositionType(tooltipPos, positionTarget, tooltip, type, mainWrapper),
        getArrowPositionType(arrowPos, positionTarget, tooltip, type, mainWrapper)
    ].join(" ");
};
