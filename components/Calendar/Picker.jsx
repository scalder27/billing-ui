import { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import events from "add-event-listener";
import moment from "../../libs/moment";

import Calendar from "./Calendar";
import DateSelect from "./DateSelect";

import styles from "./Picker.scss";

const isDetached = element => {
    let newElement = element;
    const body = document.body;

    do {
        if (newElement === body) {
            return false;
        }
        newElement = newElement.parentNode;
    } while (newElement);

    return true;
};


class Picker extends Component {
    _handleDocClick = this.handleDocClick.bind(this);

    constructor(props, context) {
        super(props, context);

        this.state = {
            date: props.value && props.value.isValid() ? props.value : moment()
        };
    }

    componentDidMount() {
        this._mounted = true;

        events.addEventListener(document, "mousedown", this._handleDocClick);

        const picker = ReactDOM.findDOMNode(this);

        const pickerInWindowBottomPosY = picker.getBoundingClientRect().bottom;

        if (pickerInWindowBottomPosY > window.innerHeight) {
            picker.style.bottom = `${this.props.verticalShift}px`;
        }
    }

    componentWillUnmount() {
        this._mounted = false;

        events.removeEventListener(document, "mousedown", this._handleDocClick);
    }

    handleMonthChange(evt) {
        var newDate = moment(this.state.date).month(evt.target.value);
        this.setState({ date: newDate });

        this.refs.calendar.moveToDate(newDate);
    }

    handleYearChange(evt) {
        var newDate = moment(this.state.date).year(evt.target.value);
        this.setState({ date: newDate });

        this.refs.calendar.moveToDate(newDate);
    }

    handleDocClick(evt) {
        if (!this._mounted) {
            return;
        }

        const target = evt.target || evt.srcElement;
        if (!ReactDOM.findDOMNode(this).contains(target) && !isDetached(target)) {
            this.props.onClose();
        }
    }

    render() {
        const { date } = this.state;
        const { minYear, maxYear } = this.props;
        return (
            <div className={styles.root}>

                <div className={styles.header}>
                    <div>
                        <DateSelect type="year"
                                    value={date.year()}
                                    minYear={minYear}
                                    maxYear={maxYear}
                                    width={60}
                                    onChange={(evt) => this.handleYearChange(evt)}
                        />
                        <DateSelect type="month"
                                    value={date.month()}
                                    width={90}
                                    onChange={(evt) => this.handleMonthChange(evt)}
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
    value: PropTypes.instanceOf(moment),
    verticalShift: PropTypes.number,
    minYear: PropTypes.number,
    maxYear: PropTypes.number,
    onPick: PropTypes.func,
    onClose: PropTypes.func
};

export default Picker;
