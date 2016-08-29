import { PureComponent, PropTypes } from "react";
import RouteLink from "react-router/lib/Link";
import Icon, { IconTypes } from "../../Icon";
import arrowFrameStyles from "./ArrowFrame.scss";

class ArrowFrame extends PureComponent {
    render() {
        const { closeUrl, backText, title, children } = this.props;

        return (
            <div className={arrowFrameStyles.frame}>
                <div className={arrowFrameStyles.header}>
                    <RouteLink to={closeUrl}>
                        <div className={arrowFrameStyles.back}>
                            <Icon type={IconTypes.ArrowChevronLeft} className={arrowFrameStyles.icon} />
                            <div className={arrowFrameStyles["back-text"]}>{backText}</div>
                        </div>
                    </RouteLink>
                    <div className={arrowFrameStyles.title}>{title}</div>
                </div>
                <div className={arrowFrameStyles.content}>{children}</div>
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