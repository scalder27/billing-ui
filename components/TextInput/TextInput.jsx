import { Component, PropTypes } from "react";
import MaskedInput from "react-input-mask";

import Tooltip from "./Tooltip";
import classnames from "classnames";

class TextInput extends Component {
    state = {
        wasTouched: false,
        inFocus: false
    };

    _handleOnChange(evt) {
        const { onChange } = this.props;
        const { wasTouched } = this.state;

        if(!wasTouched) {
            this.setState({ wasTouched: true });
        }

        if(typeof onChange === "function") {
            onChange(evt);
        }
    }

    _handleOnFocus(evt) {
        const { onFocus } = this.props;
        const { inFocus } = this.state;

        if(!inFocus) {
            this.setState({ inFocus: true });
        }

        if(typeof onFocus === "function") {
            onFocus(evt);
        }
    }

    _handleOnBlur(evt) {
        const { onBlur } = this.props;
        const { inFocus } = this.state;

        if(inFocus) {
            this.setState({ inFocus: false });
        }

        if(typeof onBlur === "function") {
            onBlur(evt);
        }
    }

    render() {
        const { width, mask, maskChar, alwaysShowMask, styles, isValid, inputClassName, tooltipCaption, tooltipPosition, ...others } = this.props;
        const { wasTouched,  inFocus } = this.state;
        const isInputValid = !wasTouched || !inFocus || isValid;

        const inputClassNames = classnames(styles.input, inputClassName, {
            [styles["input-validation-error"]]: !isInputValid,
            [styles.readonly]: others.readonly,
            [styles.disabled]: others.disabled
        });

        const inputProps = {
            ...others,
            style: { "width": width },
            type: "text",
            className: inputClassNames,
            onChange: (evt) => this._handleOnChange(evt),
            onFocus: (evt) => this._handleOnFocus(evt),
            onBlur: (evt) => this._handleOnBlur(evt)
        };

        return (
            <div>
                {mask && (
                    <MaskedInput {...inputProps} mask={mask}
                                                 maskChar={maskChar || "_"}
                                                 alwaysShowMask={alwaysShowMask} />
                )}

                {!mask && (
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
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    isValid: PropTypes.bool,
    maxLength: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    alwaysShowMask: PropTypes.bool,
    inputClassName: PropTypes.string,
    styles: PropTypes.object
};

export default TextInput;
