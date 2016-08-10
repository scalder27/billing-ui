import { Component, PropTypes } from "react";
import events from "add-event-listener";
import shouldPureComponentUpdate from "react-pure-render/function";
import cx from "classnames";

import styles from "./Header.scss";

class StickyHeader extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    state = {
        displayType: "default",
        stickyPanelHeaderHeight: "",
        stickyPanelHeaderWidth: "",
        stickyPanelHeaderStyles: {},
        stickyHeaderSubstrateStyles: {}
    };

    componentDidMount() {
        this._mainWrapper = document.getElementById("MainWrapper");

        this.calculateInitialParameters();
        events.addEventListener(this._mainWrapper, "scroll", this.handlePanelPosition.bind(this));
    }

    componentWillUnmount() {
        events.removeEventListener(this._mainWrapper, "scroll", this.handlePanelPosition.bind(this));
    }

    calculateInitialParameters() {
        setTimeout(() => {
            this.setState({ stickyPanelHeaderHeight: this.node.clientHeight, stickyPanelHeaderWidth: this.node.clientWidth });
        }, 0);
    }

    handlePanelPosition() {
        const { displayType, stickyPanelHeaderHeight, stickyPanelHeaderWidth } = this.state;
        const { stopLine, stickyPanelBodyInitialOffsetTop } = this.props;

        const scrollTop = this._mainWrapper.scrollTop;

        const isSticky = scrollTop > stickyPanelBodyInitialOffsetTop;
        const isShifting = scrollTop + stickyPanelHeaderHeight >= stopLine;

        if (isSticky && !isShifting && displayType !== "fixed") {
            this.setState({
                displayType: "fixed",
                stickyPanelHeaderStyles: {
                    position: "fixed",
                    width: stickyPanelHeaderWidth,
                    top: 0,
                    bottom: "",
                    zIndex: 1
                },
                stickyHeaderSubstrateStyles: {
                    height: stickyPanelHeaderHeight,
                    width: stickyPanelHeaderWidth
                }
            });
        }

        if (isSticky && isShifting && displayType !== "outgoing") {
            this.setState({
                displayType: "outgoing",
                stickyPanelHeaderStyles: {
                    position: "absolute",
                    width: stickyPanelHeaderWidth,
                    top: "",
                    bottom: 0,
                    zIndex: 1
                },
                stickyHeaderSubstrateStyles: {
                    height: "",
                    width: ""
                }
            });
        }

        if (!isSticky && displayType !== "default") {
            this.setState({
                displayType: "default",
                stickyPanelHeaderStyles: {
                    position: "",
                    width: "",
                    top: "",
                    bottom: "",
                    zIndex: ""
                },
                stickyHeaderSubstrateStyles: {
                    height: "",
                    width: ""
                }
            });
        }
    }

    render() {
        const { className } = this.props;
        const { stickyHeaderSubstrateStyles, stickyPanelHeaderStyles } = this.state;

        return (
            <div>
                <div style={stickyHeaderSubstrateStyles} className={styles.header}></div>
                <div style={stickyPanelHeaderStyles} className={cx(styles.header, className)} ref={ref => (this.node = ref)}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

StickyHeader.propTypes = {
    className: PropTypes.string,
    stopLine: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    stickyPanelBodyInitialOffsetTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    children: PropTypes.node
};

export default StickyHeader;
