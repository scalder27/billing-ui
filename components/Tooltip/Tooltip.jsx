import {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import events from 'add-event-listener';
import {getPosition, getPositionType} from "./PositionHandler";
import classnames from "classnames";
import PositionType from "./PositionType";
import TriggerType from "./TriggerType";

import styles from "./Tooltip.scss";

class Tooltip extends Component {
    componentDidMount() {
        if (!this._tooltip) {
            this.init();
        }
    }

    componentDidUpdate() {
        if (!this._tooltip) {
            this.init();
        } else {
            this.redraw();
        }
    }

    componentWillUnmount() {
        this.remove();
    }

    generateMarkUp() {
        const { children } = this.props;

        return (
            <div>
                {children}
            </div>
        );
    }

    createTooltipItemHtml({ positionType, className, isOpen }) {
        const tooltipItemHtml = document.createElement("div");
        this._positionType = getPositionType(positionType, this._target, tooltipItemHtml);
        const [tooltipPos, arrowPos] = this._positionType.split(" ");
        tooltipItemHtml.className = classnames(className, styles.tooltip, styles[tooltipPos], styles[`arrow-${arrowPos}`],{
            [styles["as-open"]]: isOpen
        });

        return tooltipItemHtml;
    }

    insertTooltipToDOM(tooltipItemHtml) {
        let tooltipContainer = document.getElementById("PopupContainer");
        tooltipContainer.appendChild(tooltipItemHtml);
    }

    createAndInsertTooltipToDOM(props) {
        let tooltip = this.createTooltipItemHtml(props);
        this.insertTooltipToDOM(tooltip);
        return tooltip;
    }

    init() {
        const { isOpen, getTarget } = this.props;

        this._isOpen = isOpen;
        this._target = getTarget();
        this._mainWrapper = document.getElementById("MainWrapper");
        this._tooltip = this.createAndInsertTooltipToDOM(this.props);
        ReactDOM.render(this.generateMarkUp(), this._tooltip);

        this.setSize();
        this.setPosition();
        this.attachEventListener();
    }

    attachEventListener() {
        const { trigger } = this.props;

        if (trigger === TriggerType.hover) {
            this._target.onmouseover = this.toggleTooltip.bind(this, true);
            this._target.onmouseleave = this.toggleTooltip.bind(this, false);
        }

        if (trigger === TriggerType.click) {
            this._target.onclick = this.toggleTooltip.bind(this, !this._isOpen);
        }

        if (trigger === TriggerType.focus) {
            this._target.onfocus = this.toggleTooltip.bind(this, !this._isOpen);
        }

        events.addEventListener(window, "resize", this.redraw.bind(this));
        events.addEventListener(this._mainWrapper, "scroll", this.redraw.bind(this));
    }

    toggleTooltip(show) {
        const { className } = this.props;
        this._isOpen = show;

        const [tooltipPos, arrowPos] = this._positionType.split(" ");
        this._tooltip.className = classnames(className, styles.tooltip, styles[tooltipPos], styles[`arrow-${arrowPos}`],{
            [styles["as-open"]]: show
        });
    }

    redraw() {
        const { positionType } = this.props;

        if (this._timer) {
            clearTimeout(this._timer);
        }

        this._timer = setTimeout(function() {
            this._positionType = getPositionType(positionType, this._target, this._tooltip);
            this.setPosition();
            delete this._timer;
        }.bind(this), 100);
    }

    setPosition() {
        const position = getPosition(this._positionType, this._target, this._tooltip);
        Object.keys(position).map(property => this._tooltip.style[property] = position[property]);
    }

    setSize() {
        const computedStyle = getComputedStyle(this._tooltip);

        this._tooltip.style.width = computedStyle.width;
        this._tooltip.style.height = computedStyle.height;
    }

    remove() {
        this._tooltip.remove();
        this._tooltip = null;
        this._target = null;

        events.removeEventListener(window, 'resize', this.redraw);
        events.removeEventListener(this._mainWrapper, 'scroll', this.redraw);
    }

    render() {
        return null;
    }
}

Tooltip.propTypes = {
    isOpen: PropTypes.bool,
    trigger: PropTypes.string,
    getTarget: PropTypes.func.isRequired,
    positionType: PropTypes.string,
    className: PropTypes.string,
    shouldUpdate: PropTypes.bool
};

Tooltip.defaultProps = {
    isOpen: false,
    trigger: TriggerType.hover,
    positionType: PositionType.bottomCenter,
    className: "",
    shouldUpdate: true
};

export const TriggerTypes = TriggerType;
export const PositionTypes = PositionType;
export default Tooltip;
