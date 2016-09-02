import { PureComponent, PropTypes } from "react";
import ReactDOM from "react-dom";
import DefaultTextInput from "./DefaultTextInput";
import CompactTextInput from "./CompactTextInput";
import TextInputType from "./TextInputType";
import { TooltipTypes, PositionTypes } from "../Tooltip";
import Validation from "../../helpers/ValidationHelpers";
class TextInputWrapper extends PureComponent {

    _inputDom = null;

    _setDomNode = (el) => {
        if (el) {
            const tagName = this.props.isTextArea ? "textarea" : "input";
            this._inputDom = ReactDOM.findDOMNode(el).getElementsByTagName(tagName)[0];
        }
    };

    getDomNode() {
        return this._inputDom;
    }

    focus() {
        this._inputDom.focus();
    }

    render() {
        const { type, placeholderClassName, labelClassName, ...others } = this.props;

        return (
            type === TextInputType.compact
                ? <CompactTextInput {...others} labelClassName={labelClassName} ref={this._setDomNode} />
                : <DefaultTextInput {...others} placeholderClassName={placeholderClassName} ref={this._setDomNode} />
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
    validateFunction: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
    tooltipCaption: PropTypes.node,
    tooltipClassName: PropTypes.string,
    tooltipType: PropTypes.oneOf(Object.keys(TooltipTypes).map((key) => TooltipTypes[key])),
    tooltipPosition: PropTypes.oneOf(Object.keys(PositionTypes).map((key) => PositionTypes[key])),
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
    validateFunction: Validation.Anything
};

export default TextInputWrapper;
