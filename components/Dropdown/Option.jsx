import { Component, PropTypes } from "react";
import classnames from "classnames";
import optionStyles from "./Option.scss";

class Option extends Component {
    _optionNode = null;

    handleClick() {
        const { disabled, onClick, value, caption } = this.props;

        if (!disabled && onClick) {
            onClick(value, caption);
        }
    }

    handleHover() {
        const { disabled, isSelected, onMouseOver, value } = this.props;

        if (!disabled && !isSelected && onMouseOver) {
            onMouseOver(value);
        }
    }

    render() {
        const { styles, caption, children, additionalData, wrapperClassName, captionClassName, isActive, isSelected, disabled, beforeCaption } = this.props;
        const wrapperClassNames = classnames(styles.option, wrapperClassName, {
            [styles.disabled]: disabled,
            [styles["as-active"]]: isActive,
            [styles["as-selected"]]: isSelected
        });
        const captionClassNames = classnames(styles.caption, captionClassName);

        return (
            <div className={wrapperClassNames}
                 onClick={this.handleClick.bind(this)}
                 onMouseOver={this.handleHover.bind(this)}
                 title={caption}
                 data-ft-id="dropdown-option"
                 ref={ node => {
                     this._optionNode = node
                 } }>
                {beforeCaption}
                <div className={captionClassNames}>{children || caption}</div>
                {additionalData && <span className={styles["additional-text"]}>{additionalData}</span>}
            </div>
        );
    }
}

Option.propTypes = {
    onMouseOver: PropTypes.func,
    onClick: PropTypes.func,
    isActive: PropTypes.bool,
    isSelected: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
    caption: PropTypes.string,
    beforeCaption: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
    children: PropTypes.node,
    additionalData: PropTypes.string,
    wrapperClassName: PropTypes.string,
    captionClassName: PropTypes.string,
    styles: PropTypes.object
};

Option.defaultProps = {
    styles: optionStyles,
    isActive: false,
    isSelected: false
};

export default Option;
