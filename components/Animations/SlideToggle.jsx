import react from "react";
import TweenLite from "gsap";
import { findDOMNode } from "react-dom";
import shouldPureComponentUpdate from "react-pure-render/function";

const SlideToggle = (Component, options = { duration: 0.2 }) => {
    return class SlideToggle extends react.Component {
        shouldPureComponentUpdate = shouldPureComponentUpdate;

        componentWillEnter(callback) {
            const node = findDOMNode(this);
            const { duration } = options;

            TweenLite.fromTo(node, duration, { height: 0, opacity: 0 }, {
                height: node.offsetHeight,
                opacity: 1,
                onComplete: callback
            });
        }

        componentWillLeave(callback) {
            const node = findDOMNode(this);
            const { duration } = options;

            TweenLite.fromTo(node, duration, { height: node.offsetHeight, opacity: 1 }, {
                height: 0,
                opacity: 0,
                onComplete: callback
            });
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    };
};

export default SlideToggle;
