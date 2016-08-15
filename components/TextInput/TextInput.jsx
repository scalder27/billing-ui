import { Component, PropTypes } from "react";
import MaskedInput from "react-input-mask";

import Tooltip from "./Tooltip";
import classnames from "classnames";

class TextInput extends Component {
    state = {
        wasTouched: false,
        isFocused: false
    };

    _handleOnChange(evt) {
        const { onChange } = this.props;
        const { wasTouched } = this.state;

        if (!wasTouched) {
            this.setState({ wasTouched: true });
        }

        if (typeof onChange === "function") {
            onChange(evt);
        }
    }

    _handleOnFocus(evt) {
        const { onFocus } = this.props;
        const { isFocused } = this.state;

        if (!isFocused) {
            this.setState({ isFocused: true });
        }

        if (typeof onFocus === "function") {
            onFocus(evt);
        }
    }

    _handleOnBlur(evt) {
        const { onBlur } = this.props;
        const { isFocused } = this.state;

        if (isFocused) {
            this.setState({ isFocused: false });
        }

        if (typeof onBlur === "function") {
            onBlur(evt);
        }
    }

    render() {
        const {
            width,
            height,
            mask,
            maskChar,
            alwaysShowMask,
            styles,
            isValid,
            isTextArea,
            inputClassName,
            tooltipCaption,
            tooltipPosition,
            clearable,
            ...others
        } = this.props;
        const { wasTouched, isFocused } = this.state;
        const isInputValid = !wasTouched || !isFocused || isValid;

        const inputClassNames = classnames(styles.input, inputClassName, {
            [styles["input-validation-error"]]: !isValid && wasTouched,
            [styles.readonly]: others.readonly,
            [styles.disabled]: others.disabled,
            [styles.clearable]: clearable
        });

        const inputProps = {
            ...others,
            title: others.value,
            style: {
                "width": width,
                "height": height
            },
            type: "text",
            className: inputClassNames,
            onChange: (evt) => this._handleOnChange(evt),
            onFocus: (evt) => this._handleOnFocus(evt),
            onBlur: (evt) => this._handleOnBlur(evt)
        };

        return (
            <div>
                {isTextArea && (
                    <textarea {...inputProps}/>
                )}

                {!isTextArea && mask && (
                    <MaskedInput {...inputProps} mask={mask}
                                                 maskChar={maskChar || "_"}
                                                 alwaysShowMask={alwaysShowMask} />
                )}

                {!isTextArea && !mask && (
                    <input {...inputProps} />
                )}

                {!isInputValid && tooltipCaption != null && (
                    <Tooltip isValid={isInputValid} tooltipPosition={tooltipPosition}>
                        {tooltipCaption}
                    </Tooltip>
                )}
            </div>
        );
    }
}

TextInput.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    value: PropTypes.string,
    clearable: PropTypes.bool,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    isValid: PropTypes.bool,
    isTextArea: PropTypes.bool,
    maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    alwaysShowMask: PropTypes.bool,
    inputClassName: PropTypes.string,
    styles: PropTypes.object,
    tooltipCaption: PropTypes.string,
    tooltipPosition: PropTypes.string
};

export default TextInput;
