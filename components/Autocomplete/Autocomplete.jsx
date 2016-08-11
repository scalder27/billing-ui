import { Component, PropTypes } from "react";
import axios from "axios";
import TextInput from "billing-ui/components/TextInput";
import shouldPureComponentUpdate from "react-pure-render/function";

import styles from "./Autocomplete.scss";
import cx from "classnames";

class Autocomplete extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    lastSearchResult = {};

    constructor(props, context) {
        super(props, context);
        const { value, defaultValue } = props;

        this.state = {
            selected: -1,
            value: value ? value : defaultValue
        };

        this._opened = false;
    }

    componentWillReceiveProps(props) {
        if (props.value !== undefined) {
            this.setState({ value: props.value });
        }
    }

    search(value) {
        const { requestData, url } = this.props;
        const _this = this;

        return axios.get(url, {
            params: {
                ...requestData,
                ...({ value }) }
        })
            .then(({data}) => {
                _this.lastSearchResult = (data.Options || []).reduce((result, optionData) => {
                    result[optionData.Text] = optionData;
                    return result;
                }, {});

                return Object.keys(_this.lastSearchResult);
            });
    }

    handleItemClick = (evt, index) => {
        if (evt.button !== 0) {
            return;
        }

        evt.preventDefault();
        this.choose(index);
    };

    handleChange = (value) => {
        this._opened = true;

        if (!this.props.value) {
            this.setState({ value });
        }

        this.updateItems(value);
        this.fireChange(value);
    };

    handleFocus = (evt) => {
        this._opened = true;
        const value = evt.target.value || "";

        this.updateItems(value);

        if (this.props.onFocus) {
            this.props.onFocus(evt);
        }
    };

    handleBlur = (evt) => {
        this._opened = false;
        this.setState({ items: null });

        if (this.props.onBlur) {
            this.props.onBlur(evt);
        }
    };

    handleSelect = (evt) => {
        evt.preventDefault();
    };

    handleKey = (evt) => {
        var items = this.state.items;
        var stop = false;

        if ((evt.key === "ArrowUp" || evt.key === "ArrowDown") && items) {
            evt.preventDefault();
            stop = true;

            const step = evt.key === "ArrowUp" ? -1 : 1;
            let selected = this.state.selected + step;
            if (selected >= items.length) {
                selected = -1;
            } else if (selected < -1) {
                selected = items.length - 1;
            }
            this.setState({ selected });
        } else if (evt.key === "Enter") {
            if (items && items[this.state.selected]) {
                evt.preventDefault();
                stop = true;

                this.choose(this.state.selected);
            } else {
                this._opened = false;
                this.setState({ items: null });
            }
        } else if (evt.key === "Escape" && items && items.length) {
            evt.preventDefault(); // Escape clears the input on IE.
            stop = true;

            this._opened = false;
            this.setState({ items: null });
        }

        if (!stop && this.props.onKeyDown) {
            this.props.onKeyDown(evt);
        }
    };

    updateItems(text) {
        if (!this._opened) {
            return;
        }

        const value = text || "";
        const pattern = value.trim();
        const promise = this.search(pattern);
        promise.then((items) => {
            if (this.state.value === value && this._opened) {
                this.setState({
                    items,
                    selected: -1
                });
            }
        });
    }

    choose(index) {
        var value = this.state.items[index];
        this._opened = false;

        if (!this.props.value) {
            this.setState({
                value: value,
                selected: -1,
                items: null
            });
        } else {
            this.setState({
                selected: -1,
                items: null
            });
        }

        this.fireChange(value);
    }

    fireChange(value) {
        const { onSelect, onChange } = this.props;
        const optionData = this.lastSearchResult[value];

        if (optionData && onSelect) {
            return onSelect(optionData.Value, value);
        }

        if (onChange) {
            onChange(value);
        }
    }

    renderItem(text, index) {
        const { renderItem } = this.props;
        const optionData = this.lastSearchResult[text];
        const { Text, Description } = optionData;
        const rootClass = cx({
            [styles.item]: true,
            [styles.active]: this.state.selected === index
        });

        return (
            <div key={index} className={rootClass}
                 onMouseDown={(e) => this.handleItemClick(e, index)}
                 onMouseEnter={(e) => this.setState({ selected: index })}
                 onMouseLeave={(e) => this.setState({ selected: -1 })}>
                {renderItem
                    ? renderItem(optionData)
                    : (<div>
                        <div className={styles.option}>
                            {Text}
                        </div>
                        <div className={styles.description}>
                            {Description}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    renderMenu() {
        if (!this._opened || !this.state.value) {
            return null;
        }

        const items = (this.state.items || []).map((item, index) => this.renderItem(item, index));

        return (
            <div className={styles.menuHolder}>
                <div className={styles.menu}>
                    {!items || items.length === 0
                        ? <div className={styles.empty}>ничего не найдено</div>
                        : items
                    }
                </div>
            </div>
        );
    }

    render() {
        const inputProps = {
            value: this.state.value,
            onSelect: this.handleSelect,
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            onKeyDown: this.handleKey
        };

        return (
            <span className={styles.root}>
                <TextInput
                    {...this.props}
                    {...inputProps}
                    onChange={this.handleChange} />
                {this.renderMenu()}
            </span>
        )
    }
}

Autocomplete.propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    source: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func
    ]),
    renderItem: PropTypes.func,
    onKeyDown: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    url: PropTypes.string.isRequired,
    requestData: PropTypes.object
};

Autocomplete.defaultProps = {
    requestData: {}
};

export default Autocomplete;
