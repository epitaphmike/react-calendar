import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getMods } from './util';

const clsPrefix = 'rc-Day';

const renderHeader = props => {
    if (!props.dayHeader) {
        return null;
    }

    return (
        <header className={`${clsPrefix}-Day-header`}>
            {props.date.format(props.dayHeaderFormat)}
        </header>
    );
};

const renderAgenda = props => {
    if (!props.dayAgenda) {
        return null;
    }

    return (
        <div key="agenda" className={`${clsPrefix}-Day-agenda`}>
            {props.children}
        </div>
    );
};

class Day extends React.Component {
    getModsFromProps = props => {
        const { date, mods, outside } = props;
        const modifiers = getMods(mods, date, clsPrefix, 'day');

        let clsMods, events;

        if (modifiers) {
            clsMods = modifiers.clsMods;
            events = modifiers.events;
        }

        return {
            clsMods,
            events
        };
    };

    shouldComponentUpdate(nextProps) {
        const { outside, date } = this.props;
        const currentModifiers = this.getModsFromProps(this.props);
        const nextModifiers = this.getModsFromProps(nextProps);

        const currentClsDay = classnames(clsPrefix, { 'rc-Day--outside': outside }, currentModifiers.clsMods);
        const currentEventsByDay = this.props.numberOfEventsByDate[date.format(this.props.fullYearMonthDayFormat)];

        const nextClsDay = classnames(clsPrefix, { 'rc-Day--outside': outside }, nextModifiers.clsMods);
        const nextEventsByDay = nextProps.numberOfEventsByDate[date.format(nextProps.fullYearMonthDayFormat)];

        return currentClsDay !== nextClsDay || currentEventsByDay !== nextEventsByDay;
    }

    render() {
        const clsPrefix = 'rc-Day';
        const { date, outside } = this.props;
        const modifiers = this.getModsFromProps(this.props);

        const clsDay = classnames(clsPrefix, { 'rc-Day--outside': outside }, modifiers.clsMods);
        const eventsByDay = this.props.numberOfEventsByDate[date.format(this.props.fullYearMonthDayFormat)];

        return (
            <div className={clsDay} {...modifiers.events}>
                <div className={'rc-Day--date'}>{date.format(this.props.dayFormat)}</div>
                <div className={'rc-Day--event-quantity'}>{eventsByDay || ''}</div>
                <div className={'rc-Day--annotation'}>
                    {eventsByDay > 0 && !outside
                        ? eventsByDay === 1 ? this.props.annotations[0] : this.props.annotations[1] || ''
                        : ''}
                </div>
            </div>
        );
    }
};

Day.propTypes = {
    date: PropTypes.object.isRequired,
    dayAgenda: PropTypes.bool,
    dayHeader: PropTypes.bool,
    dayHeaderFormat: PropTypes.string,
    dayFormat: PropTypes.string,
    fullYearMonthDayFormat: PropTypes.string,
    mods: PropTypes.array,
    numberOfEventsByDate: PropTypes.object,
    annotations: PropTypes.array
};

Day.defaultProps = {
    dayAgenda: false,
    dayHeader: false,
    dayHeaderFormat: 'MMM Do',
    dayFormat: 'D',
    fullYearMonthDayFormat: 'YYYY-MM-DD'
};

export default Day;
