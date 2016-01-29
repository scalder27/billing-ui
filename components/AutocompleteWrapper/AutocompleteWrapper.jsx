import { Component, PropTypes } from "react";
import Autocomplete from "react-ui/Autocomplete";
import $ from "jquery";
import styles from "./AutocompleteWrapper.scss";

class AutocompleteWrapper extends Component {
    lastSearchResult = {};

    search(value) {
        const { requestData, url } = this.props;

        return $.get(url, { ...requestData, ...({ value }) })
            .then(response => {
                this.lastSearchResult = (response.Options || []).reduce((result, optionData) => {
                    result[optionData.Text] = optionData;
                    return result;
                }, {});

                return Object.keys(this.lastSearchResult);
            });
    }

    renderItem(text) {
        const { renderItem } = this.props;
        const optionData = this.lastSearchResult[text];
        const { Text, Description } = optionData;

        return renderItem
            ? renderItem(optionData)
            : (<span className={styles.item}>{Text + " - " + Description}</span>);
    }

    changedValue(text) {
        const { onSelect } = this.props;
        const optionData = this.lastSearchResult[text];

        if (optionData) {
            return onSelect(optionData.Value, text);
        }
    }

    render() {
        return (
            <Autocomplete {...this.props}
                source={value => this.search(value)}
                renderItem={data => this.renderItem(data)}
                onChange={(evt, data) => this.changedValue(data)} />
        );
    }
}

AutocompleteWrapper.propTypes = {
    onSelect: PropTypes.func,
    url: PropTypes.string.isRequired,
    renderItem: PropTypes.func,
    requestData: PropTypes.object
};

AutocompleteWrapper.defaultProps = {
    requestData: {}
};

export default AutocompleteWrapper;
