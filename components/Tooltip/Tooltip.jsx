import { PureComponent, PropTypes } from "react";
import ReactDOM from "react-dom";
import events from "add-event-listener";

import KeyCodes from "../../helpers/KeyCodes";
import PositionType from "./PositionType";
import TriggerType from "./TriggerType";
import TooltipType from "./TooltipType";
import { calcPosition, adjustPositionType } from "./PositionHandler";

import cx from "classnames";
import styles from "./Tooltip.scss";

const findContainer = (node) => {
    let container = node;
    while (container.parentElement.tagName !== document.body.tagName) {
        container = container.parentElement;
    }

    return container;
};

class Tooltip extends PureComponent {
    constructor(props) {
        super();

        this.state = {
            isOpen: props.isOpen,
            positionType: props.positionType
        };
    }

    componentDidMount() {
        this._init();
    }

    componentWillUpdate() {
        this._detachEventListeners();
    }

    componentDidUpdate() {
        this._init();
    }

    componentWillUnmount() {
        this._detachEventListeners();
    }

    _init() {
        this._target = ReactDOM.findDOMNode(this.props.getTarget());
        this._wrapper = this.props.wrapper || findContainer(this._target);
        this._tryUpdatePositionType();

        this._setPosition();
        this._attachEventListeners();
    }

    _attachEventListeners() {
        const { trigger } = this.props;

        this._detachEventListeners();

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
            events.addEventListener(this._target, "keyup", this._toggleTooltip);
            events.addEventListener(window, "click", this._resolveGlobalClick);
            events.addEventListener(window, "keydown", this._resolveGlobalKeydown);
        }

        events.addEventListener(window, "resize", this._redraw);
        events.addEventListener(this._wrapper, "scroll", this._redraw);
    }

    _detachEventListeners() {
        events.removeEventListener(this._target, "mouseover", this._toggleTooltip);
        events.removeEventListener(this._target, "mouseleave", this._toggleTooltip);
        events.removeEventListener(this._target, "click", this._toggleTooltip);
        events.removeEventListener(this._target, "focus", this._toggleTooltip);
        events.removeEventListener(this._target, "keyup", this._toggleTooltip);

        events.removeEventListener(window, "resize", this._redraw);
        events.removeEventListener(window, "click", this._resolveGlobalClick);
        events.removeEventListener(window, "keydown", this._resolveGlobalKeydown);
        events.removeEventListener(this._wrapper, "scroll", this._redraw);
    }

    _tryUpdatePositionType() {
        const positionType = adjustPositionType(this.props.positionType, this._target, this._tooltip, this.props.type);

        if (this.state.positionType !== positionType) {
            this.setState({
                positionType
            });
        }
    }

    _setPosition() {
        const position = calcPosition(this.state.positionType, this._target, this._tooltip, this.props.type, this.props.offsetPosition);

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
                    show = false;
                    break;
                case "click":
                    show = this.props.trigger === TriggerType.hover ? false : !isOpen;
                    break;
            }
        }

        this._toggleOpenTooltip(show);
    };

    _resolveGlobalClick = (evt) => {
        const { isOpen } = this.state;
        let show = isOpen;

        if (evt) {
            const childNodesArray = Array.prototype.slice.call(this._tooltip.getElementsByTagName("*"));
            show = evt.target === this._tooltip || childNodesArray.indexOf(evt.target) !== -1 || evt.target === this._target;
        }

        this._toggleOpenTooltip(show);
    };

    _resolveGlobalKeydown = (evt) => {
        const { isOpen } = this.state;
        let show = isOpen;

        if (evt && evt.keyCode === KeyCodes.tab) {
            show = false;
        }

        this._toggleOpenTooltip(show);
    };

    _toggleOpenTooltip = (show) => {
        this.setState({ isOpen: show });

        if (!show) {
            events.removeEventListener(window, "keydown", this._resolveGlobalKeydown);
        }
    };

    render() {
        const { className, children, type } = this.props;
        const { isOpen, positionType } = this.state;

        const [tooltipPos, arrowPos] = positionType.split(" ");
        const tooltipClassNames = cx(className, styles.tooltip, styles[tooltipPos], styles[`arrow-${arrowPos}`], styles[type], {
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
    offsetPosition: PropTypes.object,
    className: PropTypes.string,
    wrapper: PropTypes.node,
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
