import { Component, PropTypes } from "react";
import classnames from "classnames";

class Link extends Component {
    render() {
        return (
            <a {...this.props}>
                {this.props.children}
            </a>
        );
    }
}

Link.propTypes = {
    href: PropTypes.string.isRequired,
    target: PropTypes.string,
    className: PropTypes.string
}

export default Link;
