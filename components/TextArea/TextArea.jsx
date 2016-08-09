import { Component, PropTypes } from "react";

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

    handleChange(evt) {
        const { onChange } = this.props;

        const textArea = evt.target;

        this.changeHeight(textArea);

        if (onChange) {
            onChange(textArea.value, evt);
        }
    }

    componentDidMount() {
        this.changeHeight(this.textArea);
    }

    changeHeight(textArea) {
        const { height } = this.state;
        const { minHeight, maxHeight } = this.props;

        const currentHeight = textArea.style.height;

        const textAreaBordersVerticalWidth = parseInt(getComputedStyle(textArea).borderTopWidth) + parseInt(getComputedStyle(textArea).borderBottomWidth);
        textArea.style.height = 0;
        let newHeight = textArea.scrollHeight + textAreaBordersVerticalWidth;
        textArea.style.height = currentHeight;

        if (newHeight > maxHeight) {
            newHeight = maxHeight;
        }

        if (newHeight < minHeight) {
            newHeight = minHeight;
        }

        if (newHeight !== height) {
            this.setState({
                height: newHeight
            });
        }
    }

    focus() {
        this.textArea.focus();
    }

    render() {
        const { height } = this.state;
        const { styles } = this.props;


        const style = {
            height
        };

        return (
            <textarea
                {...this.props}
                onChange={this.handleChange}
                className={styles.textArea}
                style={style}
                ref={ (el) => { this.textArea = el }}
            />
        );
    }
}

TextArea.propTypes = {
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,

    value: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    styles: PropTypes.object
};

TextArea.defaultProps = {
    value: "",
    styles
};

export default TextArea
