import { PureComponent, PropTypes } from "react";
import ArrowFrameLink from "./ArrowFrameLink.jsx";
import arrowFrameStyles from "./ArrowFrame.scss";

class ArrowFrame extends PureComponent {
    render() {
        const { title, styles, children } = this.props;

        return (
            <div className={styles.frame}>
                <div className={styles.header}>
                    <ArrowFrameLink closeUrl={this.props.closeUrl} backText={this.props.backText} styles={styles} />
                    <div className={styles.title}>{title}</div>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
        );
    }
}

ArrowFrame.propTypes = {
    closeUrl: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]).isRequired,
    backText: PropTypes.string,
    styles: PropTypes.object,
    children: PropTypes.node
};

ArrowFrame.defaultProps = {
    styles: arrowFrameStyles
};

export default ArrowFrame;
