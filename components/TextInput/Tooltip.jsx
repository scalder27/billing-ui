import { Component, PropTypes } from "react";
import TooltipType from "./TooltipType"
import cx from "classnames";

import styles from "./Tooltip.scss"

class Tooltip extends Component {
    render() {
        const { isValid, tooltipPosition, children } = this.props;
        return (
            <div className={cx(styles.wrapper, styles[tooltipPosition], {[styles.info]: isValid})}>
                {children}
            </div>
        );
    }
}

Tooltip.propTypes = {
    children: PropTypes.node,
    isValid: PropTypes.bool,
    tooltipPosition: PropTypes.string
};

Tooltip.defaultProps = {
    tooltipPosition: TooltipType.right
};

export default Tooltip;
