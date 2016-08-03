import { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import events from "add-event-listener";
import moment from "../../libs/moment";

import Calendar from "./Calendar";
import DateSelect from "../DateSelect";

import styles from "./Picker.scss";

class Picker extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            date: props.value ? moment(props.value, "DD.MM.YYYY") : moment()
        };
    }

    componentDidMount() {
        this._mounted = true;

        events.addEventListener(document, "mousedown", this.handleDocClick);
    }

    componentWillUnmount() {
        this._mounted = false;

        events.removeEventListener(document, "mousedown", this.handleDocClick);
    }

    handleMonthChange = evt => {
        this.setState({
            date: moment(this.state.date).month(evt.target.value)
        });
    };

    handleYearChange = evt => {
        this.setState({
            date: moment(this.state.date).year(evt.target.value)
        });
    };

    handleDocClick = evt => {
        // For some reason mousedown handler is still being called after
        // `componentWillUnmount` was called in IE11.
        if (!this._mounted) {
            return;
        }

        const target = evt.target || evt.srcElement;
        if (!ReactDOM.findDOMNode(this).contains(target)) {
            this.props.onClose();
        }
    };

    render() {
        const { date } = this.state;
        const { minYear, maxYear } = this.props;
        return (
            <div className={styles.root}>
                <div className={styles.monthYear}>
                    <div>
                        <DateSelect type="month"
                            value={date.month()}
                            width={100}
                            onChange={this.handleMonthChange}
                        />
                        <DateSelect type="year"
                            value={date.year()}
                            minYear={minYear}
                            maxYear={maxYear}
                            width={70}
                            onChange={this.handleYearChange}
                        />
                    </div>
                </div>
                <Calendar ref="calendar"
                    {...this.props}
                    initialDate={date}
                    onNav={(date) => this.setState({date})}
                />
            </div>
        );
    }
}

Picker.propTypes = {
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    minYear: PropTypes.number,
    maxYear: PropTypes.number,
    onPick: PropTypes.func,
    onClose: PropTypes.func
};

export default Picker;
