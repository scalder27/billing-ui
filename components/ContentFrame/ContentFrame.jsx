import { Component, PropTypes } from "react";
import FrameType from "./FrameType.js";
import ArrowFrame from "./ArrowFrame/ArrowFrame.jsx";
import CrossFrame from "./CrossFrame/CrossFrame.jsx";

class ContentFrame extends Component {
    render() {
        const { type } = this.props;

        return (
            <div>
                {type === FrameType.cross && <CrossFrame { ...this.props } />}
                {type === FrameType.arrow && <ArrowFrame { ...this.props } />}
            </div>
        );
    }
}

ContentFrame.propTypes = {
    type: PropTypes.oneOf(Object.keys(FrameType).map(key => FrameType[key])).isRequired
};

ContentFrame.defaultProps = {
    type: FrameType.cross
};

export default ContentFrame;
