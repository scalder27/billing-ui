import react from "react";
import TweenLite from "gsap";
import { findDOMNode } from "react-dom";
import shouldPureComponentUpdate from "react-pure-render/function";

const slideToggle = (Component, options = { duration: 0.2, slideOnWillAppear: false }) => {
    return class SlideToggle extends react.Component {
        shouldPureComponentUpdate = shouldPureComponentUpdate;

        componentWillAppear(callback) {
            const { duration, slideOnWillAppear } = options;

            if (slideOnWillAppear) {
                const node = findDOMNode(this);

                TweenLite.fromTo(node, duration, { height: 0, opacity: 0 }, {
                    height: node.offsetHeight,
                    opacity: 1,
                    onComplete: callback
                });
            }
        }

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

export default slideToggle;
