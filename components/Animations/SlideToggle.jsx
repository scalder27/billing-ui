import react from "react";
import TweenLite from "gsap";
import { findDOMNode } from "react-dom";
import shouldPureComponentUpdate from "react-pure-render/function";

const slideToggle = (Component, options = { duration: 0.2, slideOnWillAppear: false }) => {
    return class SlideToggle extends react.Component {
        shouldPureComponentUpdate = shouldPureComponentUpdate;

        _onComplete(callback, node) {
            node.style["height"] = "auto";
            callback();
        }

        componentWillAppear(callback) {
            const { duration, slideOnWillAppear } = options;

            if (slideOnWillAppear) {
                const node = findDOMNode(this);

                TweenLite.fromTo(node, duration, { height: 0, overflow: "hidden" }, {
                    height: node.offsetHeight,
                    onComplete: callback
                });
            }

            callback();
        }

        componentWillEnter(callback) {
            const node = findDOMNode(this);
            const { duration } = options;

            TweenLite.fromTo(node, duration, { height: 0, overflow: "hidden" }, {
                height: node.offsetHeight,
                onComplete: () => this._onComplete(callback, node)
            });
        }

        componentWillLeave(callback) {
            const node = findDOMNode(this);
            const { duration } = options;

            TweenLite.fromTo(node, duration, { height: node.offsetHeight, overflow: "hidden" }, {
                height: 0,
                onComplete: () => this._onComplete(callback, node)
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
