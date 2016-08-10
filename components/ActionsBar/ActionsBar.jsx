import { PropTypes } from "react";
import cx from "classnames";

import Button, { ButtonType } from "../Button";

import styles from "./ActionsBar.scss";

const ActionsBar = ({
    barClassName, submitClassName, cancelClassName,
    submitText, cancelText,
    submitDisabled, cancelDisabled,
    onSubmitClick, onCancelClick
}) => (
    <div className={cx(styles.actionsBar, barClassName)}>
        <Button type={ButtonType.button}
                onClick={onSubmitClick}
                disabled={submitDisabled}
                className={cx(styles.actionSubmit, submitClassName, {[styles.disabled]: submitDisabled})}>
            {submitText}
        </Button>
        <button type="button"
                onClick={() => { if (!cancelDisabled) onCancelClick() }}
                className={cx(styles.actionCancel, cancelClassName, { [styles.disabled]: cancelDisabled })}>
            {cancelText}
        </button>
    </div>
);

ActionsBar.propTypes = {
    barClassName: PropTypes.string,
    submitClassName: PropTypes.string,
    cancelClassName: PropTypes.string,

    submitText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,

    submitDisabled: PropTypes.bool.isRequired,
    cancelDisabled: PropTypes.bool.isRequired,

    onSubmitClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired
};

ActionsBar.defaultProps = {
    submitDisabled: false,
    cancelDisabled: false,

    submitText: "Сохранить",
    cancelText: "Отменить"
};

export default ActionsBar;
