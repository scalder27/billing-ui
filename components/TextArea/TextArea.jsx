import { Component, PropTypes } from "react";

import TextInput from "../TextInput";
import TextInputType from "../TextInput/TextInputType";
import TooltipType from "../TextInput/TooltipType";
import styles from "./TextArea.scss";

class TextArea extends Component {
    constructor(props) {
        super(props);
        const { minHeight } = this.props;

        this.state = {
            height: minHeight
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value, evt) {
        const { onChange } = this.props;

        const textArea = evt.target;

        this.changeHeight(textArea);

        if (onChange) {
            onChange(value, evt);
        }
    }

    componentDidMount() {
        const textAreaDom = this.textArea.getDomNode();
        this.changeHeight(textAreaDom);
    }

    changeHeight(textArea) {
        const { height } = this.state;
        const { minHeight } = this.props;

        const currentHeight = textArea.style.height;

        const textAreaBordersVerticalWidth = parseInt(getComputedStyle(textArea).borderTopWidth) + parseInt(getComputedStyle(textArea).borderBottomWidth);
        textArea.style.height = 0;
        let newHeight = textArea.scrollHeight + textAreaBordersVerticalWidth;
        textArea.style.height = currentHeight;

        if (newHeight < minHeight) {
            newHeight = minHeight;
        }

        if (newHeight !== height) {
            this.setState({
                height: newHeight
            });
        }
    }

    render() {
        const { height } = this.state;
        const textInputProps = { ...this.props };
        delete textInputProps.minHeight;

        return (
            <TextInput isTextArea={true}
                       inputClassName={styles.textArea}
                       height={height}
                       {...textInputProps}
                       onChange={this.handleChange}
                       ref={ (el) => { this.textArea = el }} />
        );
    }
}

TextArea.propTypes = {
    minHeight: PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
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
};

TextArea.defaultProps = {
    minHeight: 30
};

export default TextArea
