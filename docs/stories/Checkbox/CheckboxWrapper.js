import React from "react";

import "./../../src/css/icon-fonts.scss";
import Checkbox from "./../../../components/Checkbox";

export class CheckboxWrapper extends React.Component {
    static propTypes = Checkbox.propTypes;

    constructor(props, context) {
        super(props, context);
        this.state = { checked: props.checked };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ checked: nextProps.checked });
    }

    handleOnChange = (value, evt) => {
        const { onChange }= this.props;
        this.setState({ checked: !this.state.checked });

        if (onChange) {
            onChange(value, evt);
        }
    };

    render() {
        return (
            <Checkbox {...this.props}
                      checked={this.state.checked}
                      onChange={this.handleOnChange}
            />
        );
    }
}
