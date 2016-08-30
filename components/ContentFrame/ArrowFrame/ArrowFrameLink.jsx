import { PureComponent, PropTypes } from "react";
import RouteLink from "react-router/lib/Link";
import Icon, { IconTypes } from "../../Icon";

class ArrowFrameLink extends PureComponent {
    render() {
        const { closeUrl, styles, backText } = this.props;

        return (
            <RouteLink to={closeUrl}>
                <div className={styles.back}>
                    <Icon type={IconTypes.ArrowChevronLeft} className={styles.icon} />
                    <div className={styles["back-text"]}>{backText}</div>
                </div>
            </RouteLink>
        );
    }
}

ArrowFrameLink.propTypes = {
    closeUrl: PropTypes.string.isRequired,
    backText: PropTypes.string
};

export default ArrowFrameLink;
