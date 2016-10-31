import { PureComponent, PropTypes } from "react";
import cx from "classnames";
import Icon, { IconTypes } from "../Icon";

import styles from "./UtilityPanel.scss";

class UtilityPanel extends PureComponent {
    _handleCloseClick = () => {
        this.props.closeClick && this.props.closeClick();
        this.props.closePortal && this.props.closePortal();
    };

    render() {
        const { title, children, className } = this.props;

        const utilityPanelClassNames = cx(
            styles.container,
            className
        );

        return (
            <div className={utilityPanelClassNames}>
                <div className={styles.header}>
                    <div className={styles.close} onClick={this._handleCloseClick}>
                        <Icon type={IconTypes.ArrowChevronLeft} />
                    </div>
                    {title}
                </div>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        );
    }
}

UtilityPanel.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    closeClick: PropTypes.func,
    closePortal: PropTypes.func, // передаётся сюда из Portal,
    className: PropTypes.string
};

export default UtilityPanel;
