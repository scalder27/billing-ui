import { PureComponent, PropTypes } from "react";
import styles from "./CrossFrame.scss";

class CrossFrame extends PureComponent {
    render() {
        const { closeUrl, children } = this.props;

        return (
            <div className={styles.frame}>
                {closeUrl && <a href={closeUrl} className={styles.close} />}
                {children}
            </div>
        );
    }
}

CrossFrame.propTypes = {
    closeUrl: PropTypes.string,
    children: PropTypes.node
};

export default CrossFrame;
