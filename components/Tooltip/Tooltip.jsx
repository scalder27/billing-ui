import {Component, PropTypes} from "react";
import PositionType from "./PositionType";
import TriggerType from "./TriggerType";
import TooltipControl from "./Tooltip";

class Tooltip extends Component {
    componentDidMount() {
        if (!this._tooltipControl) {
            this._tooltipControl = new TooltipControl(this.props);
        }
    }

    componentDidUpdate() {
        if (!this._tooltipControl) {
            this._tooltipControl = new TooltipControl({...this.props});
        } else {
            this._tooltipControl.reinit({...this.props});
        }
    }

    componentWillUnmount() {
        this._tooltipControl.remove();
    }

    render() {
        return null;
    }
}

Tooltip.propTypes = {
    isOpen: PropTypes.bool,
    getTarget: PropTypes.func.isRequired,
    trigger: PropTypes.oneOf(Object.keys(TriggerType).map((key) => TriggerType[key])),
    positionType: PropTypes.oneOf(Object.keys(PositionType).map((key) => PositionType[key])),
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

export default Tooltip;
