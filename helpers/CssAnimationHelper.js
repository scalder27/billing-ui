import cx from "classnames";

const play = (type, element, className, duration = 0.4) => {
    const oldClassNames = element.className;
    element.className = cx(element.className, className);
    element.style.cssText = `
        -webkit-${type}-duration: ${duration}ms;
        -o-${type}-duration: ${duration}ms;
        -moz-${type}-duration: ${duration}ms;
        ${type}-duration: ${duration}ms;
    `;

    setTimeout(() => {
        element.className = oldClassNames
    }, duration);
};

export const playCssAnimation = (element, className, duration) => {
    play("animation", element, className, duration);
};

export const playCssTransition = (element, className, duration) => {
    play("transition", element, className, duration);
};
