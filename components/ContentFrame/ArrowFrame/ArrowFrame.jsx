import { Component, PropTypes } from "react";
// import styles from "./ArrowFrame.scss";

class ArrowFrame extends Component {
    render() {
        return (
            <div></div>
        );
    }
}

ArrowFrame.propTypes = {
    closeUrl: PropTypes.string,
    title: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
    backText: PropTypes.string,
    children: PropTypes.node
};

export default ArrowFrame;
