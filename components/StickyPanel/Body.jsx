import { PureComponent, PropTypes } from "react";

class StickyBody extends PureComponent {
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

export default StickyBody;
