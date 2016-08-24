import { PropTypes, PureComponent } from "react";
import events from "add-event-listener";
import { throttle } from "underscore";

import DisplayType from "./DisplayType";
import cx from "classnames";

import styles from "./Header.scss";

class StickyHeader extends PureComponent {
    state = {
        displayType: DisplayType.default,
        stickyPanelHeaderHeight: "",
        stickyPanelHeaderWidth: "",
        stickyPanelHeaderStyles: {},
        stickyHeaderSubstrateStyles: {}
    };

    componentDidMount() {
        this._mainWrapper = document.getElementById("MainWrapper");

        this.calculateInitialParameters();
        events.addEventListener(this._mainWrapper, "scroll", this._handleScroll);
    }

    componentDidUpdate() {
        this.calculateInitialParameters();
    }

    componentWillUnmount() {
        events.removeEventListener(this._mainWrapper, "scroll", this._handleScroll);
    }

    calculateInitialParameters = throttle(() => {
        const stickyPanelHeaderHeight = this.node.clientHeight;
        const stickyPanelHeaderWidth = this.node.clientWidth;
        const nextState = this._createHeaderState(stickyPanelHeaderHeight, stickyPanelHeaderWidth);

        this.setState({ ...nextState, stickyPanelHeaderHeight, stickyPanelHeaderWidth });
    }, 0);

    _handleScroll = throttle(() => {
        const {stickyPanelHeaderHeight, stickyPanelHeaderWidth} = this.state;
        const nextState = this._createHeaderState(stickyPanelHeaderHeight, stickyPanelHeaderWidth);
        this.setState({ ...nextState });
    }, 0);

    _createHeaderState = (stickyPanelHeaderHeight, stickyPanelHeaderWidth) => {
        const { displayType } = this.state;
        const { stickyPanelHeight } = this.props;

        const offsetTop = this._wrapper.getBoundingClientRect().top;
        const isSticky = offsetTop < 0;
        const isShifting = offsetTop + stickyPanelHeight - stickyPanelHeaderHeight < 0;

        if (isSticky && !isShifting && displayType !== DisplayType.fixed) {
            return {
                displayType: DisplayType.fixed,
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
            };
        }

        if (isSticky && isShifting && displayType !== DisplayType.outgoing) {
            return {
                displayType: DisplayType.outgoing,
                stickyPanelHeaderStyles: {
                    position: "absolute",
                    width: stickyPanelHeaderWidth,
                    top: "",
                    bottom: 0,
                    zIndex: 1
                },
                stickyHeaderSubstrateStyles: {
                    height: stickyPanelHeaderHeight,
                    width: stickyPanelHeaderWidth
                }
            };
        }

        if (!isSticky && displayType !== DisplayType.default) {
            return {
                displayType: DisplayType.default,
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
            };
        }
    };

    render() {
        const { className } = this.props;
        const { stickyHeaderSubstrateStyles, stickyPanelHeaderStyles } = this.state;

        return (
            <div ref={el => { this._wrapper = el; }}>
                <div style={stickyHeaderSubstrateStyles} className={styles.header}></div>
                <div style={stickyPanelHeaderStyles} className={cx(styles.header, className)} ref={el => (this.node = el)}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

StickyHeader.propTypes = {
    className: PropTypes.string,
    stickyPanelHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    children: PropTypes.node
};

export default StickyHeader;
