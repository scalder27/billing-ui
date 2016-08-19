import { Component, PropTypes, Children, cloneElement } from "react";
import events from "add-event-listener";
import { throttle } from "underscore";

import Header from "./Header";
import Body from "./Body";

import styles from "./StickyPanel.scss";

class StickyPanel extends Component {
    state = {
        stickyPanelHeight: ""
    };

    componentDidMount() {
        this._mainWrapper = document.getElementById("MainWrapper");

        this.calculateInitialParameters();
        events.addEventListener(this._mainWrapper, "resize", this.calculateInitialParameters);
    }

    componentWillReceiveProps() {
        this.setState({ stickyPanelHeight: "" });
    }

    componentDidUpdate(prevProps, prevState) {
        const { stickyPanelHeight } = this.state;

        if (stickyPanelHeight !== prevState.stickyPanelHeight) {
            this.calculateInitialParameters();
        }
    }

    componentWillUnmount() {
        events.removeEventListener(this._mainWrapper, "resize", this.calculateInitialParameters);
    }

    calculateInitialParameters = throttle(() => {
        const clientHeight = this._stickyWrapper.clientHeight;
        this.setState({ stickyPanelHeight: clientHeight });
    }, 0);

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
        const { stickyPanelHeight } = this.state;

        return cloneElement(HeaderComponent, {
            ...props,
            stickyPanelHeight: stickyPanelHeight
        });
    }

    render() {
        const { StickyPanelHeader, StickyPanelBody } = this._extractStickyPanelChildren();

        return (
            <div className={styles.wrapper} style={{ height: this.state.stickyPanelHeight }} ref={el => (this._stickyWrapper = el)}>
                {this._extendHeaderChild(StickyPanelHeader)}
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
