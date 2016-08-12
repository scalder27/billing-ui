import { Component, PropTypes, Children, cloneElement } from "react";
import events from "add-event-listener";
import { throttle } from "underscore";

import Header from "./Header";
import Body from "./Body";

import styles from "./StickyPanel.scss";

class StickyPanel extends Component {
    state = {
        stickyPanelBodyHeight: "",
        stickyPanelBodyInitialOffsetTop: ""
    };

    componentDidMount() {
        this._mainWrapper = document.getElementById("MainWrapper");

        this.calculateInitialParameters();
        events.addEventListener(this._mainWrapper, "resize", throttle(this.calculateInitialParameters.bind(this), 50));
    }

    componentWillUnmount() {
        events.removeEventListener(this._mainWrapper, "resize", throttle(this.calculateInitialParameters.bind(this), 50));
    }

    calculateInitialParameters() {
        setTimeout(() => {
            this.setState({
                stickyPanelBodyHeight: this._stickyWrapper.clientHeight,
                stickyPanelBodyInitialOffsetTop: this._stickyWrapper.getBoundingClientRect().top
            });
        }, 0)
    }

    _extractStickyPanelChildren() {
        return Children.toArray(this.props.children).reduce((result, child) => {
            if (child.type === Header) {
                result.StickyPanelHeader = child;
            } else if (child.type === Body) {
                result.StickyPanelBody = child;
            }

            return result;
        }, {});
    }

    _extendHeaderChild(HeaderComponent) {
        const { props } = HeaderComponent;
        const { stickyPanelBodyHeight, stickyPanelBodyInitialOffsetTop } = this.state;

        return cloneElement(HeaderComponent, {
            ...props,
            stickyPanelBodyInitialOffsetTop: stickyPanelBodyInitialOffsetTop,
            stopLine: stickyPanelBodyHeight + stickyPanelBodyInitialOffsetTop
        });
    }

    render() {
        const { StickyPanelHeader, StickyPanelBody } = this._extractStickyPanelChildren();

        return (
            <div className={styles.wrapper} style={{ height: this.state.stickyPanelBodyHeight }} ref={el => (this._stickyWrapper = el)}>
                <div>
                    {this._extendHeaderChild(StickyPanelHeader)}
                </div>
                {StickyPanelBody}
            </div>
        );
    }
}

StickyPanel.Header = Header;
StickyPanel.Body = Body;

StickyPanel.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object)
};

export default StickyPanel;
