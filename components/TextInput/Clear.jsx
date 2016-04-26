import Icon, { IconTypes } from "../Icon";

const Clear = ({ className, onClick }) => (
    <span className={className} onClick={onClick}>
        <Icon type={IconTypes.Delete} />
    </span>
);

export default Clear;
