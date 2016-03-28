import {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {getPosition} from "./PositionHandler";
import classnames from "classnames";
import PositionType from "./PositionType";
import TriggerType from "./TriggerType";

import styles from "./Tooltip.scss";

class Tooltip extends Component {
    componentDidMount() {
        const { shouldUpdate } = this.props;
        if (!this._tooltip && shouldUpdate) {
            this.init();
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.shouldUpdate && this.remove();
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.shouldUpdate;
    }

    componentDidUpdate() {
        const { shouldUpdate } = this.props;
        if (!this._tooltip && shouldUpdate) {
            this.init();
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

        const [tooltipPos, arrowPos] = positionType.split(" ");
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
        const { trigger, isOpen, getTarget } = this.props;

        this._isOpen = isOpen;
        this._target = getTarget();
        this._tooltip = this.createAndInsertTooltipToDOM(this.props);
        ReactDOM.render(this.generateMarkUp(), this._tooltip);

        this.setPosition();

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
    }

    toggleTooltip(show) {
        const { className, positionType } = this.props;
        this._isOpen = show;

        const [tooltipPos, arrowPos] = positionType.split(" ");
        this._tooltip.className = classnames(className, styles.tooltip, styles[tooltipPos], styles[`arrow-${arrowPos}`],{
            [styles["as-open"]]: show
        });
    }

    setPosition() {
        const { positionType } = this.props;
        const position = getPosition(positionType, this._target, this._tooltip);
        Object.keys(position).map(property => this._tooltip.style[property] = position[property]);
    }

    remove() {
        this._tooltip.remove();
        this._tooltip = null;
        this._target = null;
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
