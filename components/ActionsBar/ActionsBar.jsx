import { PropTypes } from "react";
import cx from "classnames";

import Button, { ButtonType } from "../Button";

import styles from "./ActionsBar.scss";

const ActionsBar = ({
    showCancel,
    barClassName, submitClassName, cancelClassName,
    submitText, cancelText,
    submitDisabled, cancelDisabled,
    onSubmitClick, onCancelClick,
    submitAttributes, cancelAttributes,
    children
}) => (
    <div className={cx(styles.actionsBar, barClassName)}>
        <Button type={ButtonType.button}
                onClick={onSubmitClick}
                disabled={submitDisabled}
                className={cx(styles.actionSubmit, submitClassName, {[styles.disabled]: submitDisabled})}
                attributes={submitAttributes} >
            {submitText}
        </Button>
        {showCancel && (
            <button type="button"
                    onClick={() => { if (!cancelDisabled) onCancelClick() }}
                    className={cx(styles.actionCancel, cancelClassName, { [styles.disabled]: cancelDisabled })}
                    { ...cancelAttributes } >
                {cancelText}
            </button>
        )}
        {children}
    </div>
);

ActionsBar.propTypes = {
    showCancel: PropTypes.bool.isRequired,

    submitAttributes: PropTypes.object,
    cancelAttributes: PropTypes.object,

    barClassName: PropTypes.string,
    submitClassName: PropTypes.string,
    cancelClassName: PropTypes.string,

    submitText: PropTypes.string.isRequired,
    cancelText: PropTypes.string,

    submitDisabled: PropTypes.bool.isRequired,
    cancelDisabled: PropTypes.bool,

    onSubmitClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func,

    children: PropTypes.node
};

ActionsBar.defaultProps = {
    showCancel: true,

    submitDisabled: false,
    cancelDisabled: false,

    submitText: "Сохранить",
    cancelText: "Отменить"
};

export default ActionsBar;
