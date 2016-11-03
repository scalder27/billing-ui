import React from "react";

import "./../../src/css/icon-fonts.scss";
import TextInput from "./../../../components/TextInput";

export class TextInputWrapper extends React.Component {
    static propTypes = TextInput.propTypes;

    constructor(props, context) {
        super(props, context);
        this.state = { value: props.value };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    handleOnChange = (value, evt) => {
        const { onChange }= this.props;
        this.setState({ value: value });

        if (onChange) {
            onChange(value, evt);
        }
    };

    render() {
        return (
            <TextInput {...this.props}
                       value={this.state.value}
                       onChange={this.handleOnChange}
            />
        );
    }
}
