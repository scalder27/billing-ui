import events from 'add-event-listener';
import {getPosition, getPositionType} from "./PositionHandler";
import classnames from "classnames";
import PositionType from "./PositionType";
import TriggerType from "./TriggerType";

import styles from "./Tooltip.scss";

class TooltipControl {
    constructor(options) {
        this._options = options;
        this._init();
    }

    reinit(options) {
        this._options = options;
        const { positionType, className, isOpen } = this._options;

        this._tooltip.remove();
        this._tooltip = this._createAndInsertTooltipToDOM();
        ReactDOM.render(this._generateMarkUp(), this._tooltip);

        this._setSize();
        this._setPosition();
        this._toggleTooltip(this._isOpen);
    }

    redraw() {
        const { positionType } = this._options;

        if (this._timer) {
            clearTimeout(this._timer);
        }

        this._timer = setTimeout(function() {
            this._positionType = getPositionType(positionType, this._target, this._tooltip);
            this._setPosition();
            delete this._timer;
        }.bind(this), 100);
    }

    remove() {
        events.removeEventListener(this._target, 'mouseover', this._toggleTooltip);
        events.removeEventListener(this._target, 'mouseleave', this._toggleTooltip);
        events.removeEventListener(this._target, 'click', this._toggleTooltip);
        events.removeEventListener(this._target, 'focus', this._toggleTooltip);

        events.removeEventListener(window, 'resize', this.redraw);
        events.removeEventListener(this._mainWrapper, 'scroll', this.redraw);

        this._tooltip.remove();
        this._tooltip = null;
        this._target = null;
    }

    _init() {
        const { isOpen, getTarget } = this._options;

        this._isOpen = isOpen;
        this._target = ReactDOM.findDOMNode(getTarget());
        this._mainWrapper = document.getElementById("MainWrapper");
        this._tooltip = this._createAndInsertTooltipToDOM();
        ReactDOM.render(this._generateMarkUp(), this._tooltip);

        this._setSize();
        this._setPosition();
        this._attachEventListener();
    }

    _attachEventListener() {
        const { trigger } = this._options;

        if (trigger === TriggerType.hover) {
            events.addEventListener(this._target, "mouseover", this._toggleTooltip.bind(this, true));
            events.addEventListener(this._target, "mouseleave", this._toggleTooltip.bind(this, false));
        }

        if (trigger === TriggerType.click) {
            events.addEventListener(this._target, "click", this._toggleTooltip.bind(this, !this._isOpen));
        }

        if (trigger === TriggerType.focus) {
            events.addEventListener(this._target, "focus", this._toggleTooltip.bind(this, !this._isOpen));
        }

        events.addEventListener(window, "resize", this.redraw.bind(this));
        events.addEventListener(this._mainWrapper, "scroll", this.redraw.bind(this));
    }

    _generateMarkUp() {
        const { children } = this._options;

        return (
            <div>
                {children}
            </div>
        );
    }

    _createTooltipItemHtml() {
        const { positionType, className, isOpen } = this._options;

        const tooltipItemHtml = document.createElement("div");
        this._positionType = getPositionType(positionType, this._target, tooltipItemHtml);
        const [tooltipPos, arrowPos] = this._positionType.split(" ");
        tooltipItemHtml.className = classnames(className, styles.tooltip, styles[tooltipPos], styles[`arrow-${arrowPos}`],{
            [styles["as-open"]]: isOpen
        });

        return tooltipItemHtml;
    }

    _insertTooltipToDOM(tooltipItemHtml) {
        let tooltipContainer = document.getElementById("PopupContainer");
        tooltipContainer.appendChild(tooltipItemHtml);
    }

    _createAndInsertTooltipToDOM() {
        let tooltip = this._createTooltipItemHtml();
        this._insertTooltipToDOM(tooltip);
        return tooltip;
    }

    _toggleTooltip(show) {
        const { className } = this._options;
        this._isOpen = show;

        const [tooltipPos, arrowPos] = this._positionType.split(" ");
        this._tooltip.className = classnames(className, styles.tooltip, styles[tooltipPos], styles[`arrow-${arrowPos}`],{
            [styles["as-open"]]: show
        });
    }

    _setPosition() {
        const position = getPosition(this._positionType, this._target, this._tooltip);
        Object.keys(position).map(property => this._tooltip.style[property] = position[property]);
    }

    _setSize() {
        const computedStyle = getComputedStyle(this._tooltip);

        this._tooltip.style.width = computedStyle.width;
        this._tooltip.style.height = computedStyle.height;
    }
}

export default TooltipControl;
