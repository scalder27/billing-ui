import { Component, PropTypes } from "react";
import cx from "classnames";

import TextArea from "./TextArea";
import styles from "./TextArea.scss";

class TextAreaWrapper extends Component {
    render() {
        const { styles, wrapperClassName, placeholderClassName, placeholder, value, ...inputProps } = this.props;
        const wrapperClassNames = cx(styles.wrapper, wrapperClassName);
        const placeholderClassNames = cx(styles.placeholder, placeholderClassName);
        const placeholderWrapperClassNames = cx(styles["placeholder-wrapper"], {
            [styles["as-hidden"]]: value
        });

        return (
            <div className={wrapperClassNames}>
                <span className={placeholderWrapperClassNames}>
                    <span className={placeholderClassNames}>{placeholder}</span>
                </span>
                <TextArea
                    {...inputProps}
                    styles={styles}
                    placeholder={null}
                    value={value}/>
            </div>
        );
    }
}

TextAreaWrapper.propTypes = {
    wrapperClassName: PropTypes.string,
    placeholderClassName: PropTypes.string,

    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,

    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    styles: PropTypes.object
};

TextAreaWrapper.defaultProps = {
    minHeight: 21,
    maxHeight: Infinity,
    value: "",
    styles
};

export default TextAreaWrapper
