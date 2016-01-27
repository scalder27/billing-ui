import { Component, PropTypes } from "react";
import IconType from "./IconType";
import classnames from "classnames";

class Icon extends Component {
    render() {
        const {type, className} = this.props;
        const iconClass = classnames("iconic base-unselectable", className);
        return (
            <span className={iconClass} unselectable="on">
                {type}
            </span>
        );
    }
}

Icon.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
};

Icon.defaultProps = {
    className: ""
};

export const IconTypes = IconType;
export default Icon;
