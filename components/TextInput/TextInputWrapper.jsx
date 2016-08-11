import { Component, PropTypes } from "react";
import ReactDom from "react-dom";
import DefaultTextInput from "./DefaultTextInput";
import CompactTextInput from "./CompactTextInput";
import TextInputType from "./TextInputType";
import TooltipType from "./TooltipType";

class TextInputWrapper extends Component {
    _inputDom = null;

    _setInputDom = (el) => {
        const tagName = this.props.isTextArea ? "textarea" : "input";
        this._inputDom = ReactDom.findDOMNode(el).getElementsByTagName(tagName)[0];
    };

    getInputDom() {
        return this._inputDom;
    }

    render() {
        const { type, placeholderClassName, labelClassName, ...others } = this.props;

        return (
            type === TextInputType.compact
                ? <CompactTextInput {...others} labelClassName={labelClassName} ref={this._setInputDom}/>
                : <DefaultTextInput {...others} placeholderClassName={placeholderClassName} ref={this._setInputDom}/>
        );
    }
}

TextInputWrapper.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    isTextArea: PropTypes.bool,
    clearable: PropTypes.bool,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    isValid: PropTypes.bool,
    tooltipCaption: PropTypes.node,
    tooltipPosition: PropTypes.oneOf(Object.keys(TooltipType).map((key) => TooltipType[key])),
    maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    alwaysShowMask: PropTypes.bool,
    wrapperClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    placeholderClassName: PropTypes.string,
    styles: PropTypes.object,
    type: PropTypes.oneOf(Object.keys(TextInputType).map((key) => TextInputType[key]))
    // Так же можно передать остальные стандартные атрибуты текстового инпута, но визуально они ни как не обрабатываются
};

TextInputWrapper.defaultProps = {
    wrapperClassName: "",
    inputClassName: "",
    labelClassName: "",
    placeholderClassName: "",
    width: 180,
    isValid: true,
    isTextArea: false,
    type: TextInputType.default,
    tooltipPosition: TooltipType.right
};

export default TextInputWrapper;
