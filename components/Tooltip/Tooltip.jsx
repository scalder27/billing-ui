import { PureComponent, PropTypes } from "react";
import ReactDOM from "react-dom";
import events from "add-event-listener";

import PositionType from "./PositionType";
import TriggerType from "./TriggerType";
import { getPosition, getPositionType } from "./PositionHandler";

import cx from "classnames";
import styles from "./Tooltip.scss";

class Tooltip extends PureComponent {
    constructor(props) {
        super();

        this.state = {
            isOpen: props.isOpen,
            positionType: props.positionType
        };

        this._mainWrapper = document.getElementById("MainWrapper");
    }

    componentDidMount() {
        this._init();
    }

    componentDidUpdate() {
        this._init();
    }

    _init() {
        this._target = ReactDOM.findDOMNode(this.props.getTarget());
        this._tryUpdatePositionType();

        this._setPosition();
        this._attachEventListener();
    }

    _attachEventListener() {
        this._detachEventListener();
        const { trigger } = this.props;

        if (trigger === TriggerType.hover) {
            events.addEventListener(this._target, "mouseover", this._toggleTooltip);
            events.addEventListener(this._target, "mouseleave", this._toggleTooltip);
            events.addEventListener(this._target, "click", this._toggleTooltip);
        }

        if (trigger === TriggerType.click) {
            events.addEventListener(this._target, "click", this._toggleTooltip);
        }

        if (trigger === TriggerType.focus) {
            events.addEventListener(this._target, "focus", this._toggleTooltip);
        }

        events.addEventListener(window, "resize", this._redraw);
        events.addEventListener(this._mainWrapper, "scroll", this._redraw);
    }

    _detachEventListener() {
        events.removeEventListener(this._target, "mouseover", this._toggleTooltip);
        events.removeEventListener(this._target, "mouseleave", this._toggleTooltip);
        events.removeEventListener(this._target, "click", this._toggleTooltip);
        events.removeEventListener(this._target, "focus", this._toggleTooltip);

        events.removeEventListener(window, "resize", this._redraw);
        events.removeEventListener(this._mainWrapper, "scroll", this._redraw);
    }

    _tryUpdatePositionType() {
        const positionType = getPositionType(this.props.positionType, this._target, this._tooltip);

        if (this.state.positionType !== positionType) {
            this.setState({
                positionType
            });
        }
    }

    _setPosition() {
        const position = getPosition(this.state.positionType, this._target, this._tooltip);
        Object.keys(position).map(property => {
            this._tooltip.style[property] = position[property]
        });
    }

    _redraw = () => {
        if (this._timer) {
            clearTimeout(this._timer);
        }

        this._timer = setTimeout(() => {
            this._tryUpdatePositionType();
            delete this._timer;
        }, 100);
    };

    _toggleTooltip = (evt) => {
        const { isOpen } = this.state;
        let show = isOpen;

        if (evt) {
            switch (evt.type) {
                case "mouseover":
                    show = true;
                    break;
                case "mouseleave":
                    show = false;
                    break;
                case "focus":
                    show = !isOpen;
                    break;
                case "click":
                    show = this.props.trigger === TriggerType.hover ? false : !isOpen;
                    break;
            }
        }

        this.setState({isOpen: show});
    };

    render() {
        const { className, children } = this.props;
        const { isOpen, positionType } = this.state;

        const [tooltipPos, arrowPos] = positionType.split(" ");
        const tooltipClassNames = cx(className, styles.tooltip, styles[tooltipPos], styles[`arrow-${arrowPos}`], {
            [styles["as-open"]]: isOpen
        });

        return (
            <div className={tooltipClassNames} ref={(el) => el && (this._tooltip = el)}>
                {children}
            </div>
        )
    }
}

Tooltip.propTypes = {
    isOpen: PropTypes.bool,
    getTarget: PropTypes.func.isRequired,
    trigger: PropTypes.oneOf(Object.keys(TriggerType).map((key) => TriggerType[key])),
    positionType: PropTypes.oneOf(Object.keys(PositionType).map((key) => PositionType[key])),
    className: PropTypes.string
};

Tooltip.defaultProps = {
    isOpen: false,
    trigger: TriggerType.hover,
    positionType: PositionType.leftMiddle,
    className: ""
};

export default Tooltip;
