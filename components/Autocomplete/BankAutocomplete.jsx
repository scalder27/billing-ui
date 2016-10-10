import { PureComponent, PropTypes } from "react";
import { validate } from "../../helpers/ValidationHelpers";
import Autocomplete from "./Autocomplete";

class BankAutocomplete extends PureComponent {
    _bikLength = 9;

    _validateLength = (error = `БИК должен состоять из ${this._bikLength} цифр`) => (value) => {
        const valueSplitted = value.split(" ");
        const re = /^(\d{9})?$/;

        return {
            isValid: re.test(valueSplitted[0]),
            error
        }
    };

    handleChange = (value) => {
        if (this.props.onChange) {
            this.props.onChange({
                value,
                validationResult: validate(value, this._validateLength())
            });
        }
    };

    render() {
        const props = {
            ...this.props,
            onChange: this.handleChange,
            valueCreator: searchResultItem => `${searchResultItem.Value} ${searchResultItem.Description}`
        };

        return (
            <Autocomplete { ...props } />
        );
    }
}

BankAutocomplete.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    url: PropTypes.string.isRequired,
    valueCreator: PropTypes.func
};

export default BankAutocomplete;
