import { Component, PropTypes } from "react";
import shouldPureComponentUpdate from "react-pure-render/function";
import pure from "recompose/pure";

class StickyBody extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const { children, className } = this.props;

        return (
            <div className={className}>
                {children}
            </div>
        )
    }
}

StickyBody.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

export default pure(StickyBody);
