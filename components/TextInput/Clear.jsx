import { PropTypes } from "react";
import Icon, { IconTypes } from "../Icon";

const Clear = ({ className, onClick }) => (
    <span className={className} onClick={onClick}>
        <Icon type={IconTypes.Delete} />
    </span>
);

Clear.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default Clear;
