import { PureComponent, PropTypes } from "react";
import IconType from "./IconType";
import classnames from "classnames";

class Icon extends PureComponent {
    render() {
        const { type, className, onClick } = this.props;
        const iconClass = classnames("iconic base-unselectable", className);
        return (
            <span className={iconClass} unselectable="on" onClick={onClick}>
                {type}
            </span>
        );
    }
}

Icon.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

Icon.defaultProps = {
    className: "",
    onClick: () => {}
};

export const IconTypes = IconType;
export default Icon;
