import { PureComponent, PropTypes } from "react";
import ReactDOM from "react-dom";
import events from "add-event-listener";

import PositionType from "./PositionType";
import TriggerType from "./TriggerType";
import TooltipType from "./TooltipType";
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

        this._margin = props.type === TooltipType.validation ? -1 : 15;
        this._mainWrapper = document.getElementById("MainWrapper");
    }

    componentDidMount() {
        this._init();
    }

    componentWillUpdate() {
        this._detachEventListener();
    }

    componentDidUpdate() {
        this._init();
    }

    componentWillUnmount() {
        this._detachEventListener();
    }

    _init() {
        this._target = ReactDOM.findDOMNode(this.props.getTarget());
        this._tryUpdatePositionType();

        this._setPosition();
        this._attachEventListener();
    }

    _attachEventListener() {
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
            events.addEventListener(this._target, "blur", this._toggleTooltip);
            events.addEventListener(this._target, "keyup", this._toggleTooltip);
        }

        events.addEventListener(window, "resize", this._redraw);
        events.addEventListener(this._mainWrapper, "scroll", this._redraw);
    }

    _detachEventListener() {
        events.removeEventListener(this._target, "mouseover", this._toggleTooltip);
        events.removeEventListener(this._target, "mouseleave", this._toggleTooltip);
        events.removeEventListener(this._target, "click", this._toggleTooltip);
        events.removeEventListener(this._target, "focus", this._toggleTooltip);
        events.removeEventListener(this._target, "blur", this._toggleTooltip);
        events.removeEventListener(this._target, "keyup", this._toggleTooltip);

        events.removeEventListener(window, "resize", this._redraw);
        events.removeEventListener(this._mainWrapper, "scroll", this._redraw);
    }

    _tryUpdatePositionType() {
        const positionType = getPositionType(this.props.positionType, this._target, this._tooltip, this.props.type);

        if (this.state.positionType !== positionType) {
            this.setState({
                positionType
            });
        }
    }

    _setPosition() {
        const position = getPosition(this.state.positionType, this._target, this._tooltip, this.props.type);
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
                case "focus":
                case "keyup":
                    show = true;
                    break;
                case "mouseleave":
                case "blur":
                    show = false;
                    break;
                case "click":
                    show = this.props.trigger === TriggerType.hover ? false : !isOpen;
                    break;
            }
        }

        this.setState({ isOpen: show });
    };

    render() {
        const { className, children, type } = this.props;
        const { isOpen, positionType } = this.state;

        const [tooltipPos, arrowPos] = positionType.split(" ");
        const tooltipClassNames = cx(className, styles.tooltip, styles[tooltipPos], styles[`arrow-${arrowPos}`], styles[type], {
            [styles["as-open"]]: isOpen
        });

        return (
            <div className={tooltipClassNames} ref={(el) => el && (this._tooltip = el)} style={{ width: "100px" }}>
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
    className: PropTypes.string,
    type: PropTypes.oneOf(Object.keys(TooltipType).map((key) => TooltipType[key]))
};

Tooltip.defaultProps = {
    isOpen: false,
    trigger: TriggerType.hover,
    positionType: PositionType.bottomCenter,
    type: TooltipType.tip,
    className: ""
};

export default Tooltip;
