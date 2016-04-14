import { Component, PropTypes } from "react";
import optionStyles from "./Option.scss";
import classnames from "classnames";

class Option extends Component {
    handleClick() {
        const { disabled, isSelected, onClick, value, caption } = this.props;

        if (!disabled && !isSelected && onClick) {
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
        const { styles, caption, additionalData, className, isActive, isSelected, disabled } = this.props;
        const classNames = classnames(styles.option, className, {
            [styles.disabled]: disabled,
            [styles["as-active"]]: isActive,
            [styles["as-selected"]]: isSelected
        });

        return (
            <div className={classNames} onClick={this.handleClick.bind(this)} onMouseOver={this.handleHover.bind(this)}>
                <span className={styles.caption}>{caption}</span>
                <span className={styles["additional-text"]}>{additionalData}</span>
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
    value: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    additionalData: PropTypes.string,
    className: PropTypes.string,
    styles: PropTypes.object
};

Option.defaultProps = {
    styles: optionStyles,
    isActive: false,
    isSelected: false
};

export default Option;
