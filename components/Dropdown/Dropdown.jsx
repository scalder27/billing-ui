import { Component, PropTypes } from "react";

class Dropdown extends Component {
    render() {
        return (
            <div></div>
        );
    }
}

Dropdown.propTypes = {
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
};

Dropdown.defaultProps = {

};

export default Dropdown;
