import React  from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getMods, getModsByCompType } from './util';
import { daysOfWeek } from './dateUtils';
import Day from './Day';

const clsPrefix = 'rc-Week';

const makeWeekNumber = (props) => {
  if (!props.weekNumbers) {
    return null;
  }

  return (
    <div key="weekNumber" className={ classnames(`${clsPrefix}-number`) }>
      { props.date.format(props.weekNumberFormat) }
    </div>
  );
};

const renderWeekHeader = (props) => {
  if (!props.weekHeader) {
    return null;
  }

  return (
    <div className={`${clsPrefix}-weekdays`}>
      {
        daysOfWeek(props.date).map((weekday, i) =>
          <div key={ `weekday-header-${i}` } className={ classnames(`${clsPrefix}-weekdays-weekday`) }>
            { weekday.format(props.weekdayFormat) }
          </div>
        )
      }
    </div>
  );
};

class Week extends React.Component {
    getModsFromProps = props => {
        const { mods, date } = props;
        let clsMods, events, week = props;

        week = getModsByCompType('week', mods);
        const modifiers = getMods(week, date, clsPrefix, 'week');

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
        const thisWeekModifiers = this.getModsFromProps(this.props);
        const nextWeekModifiers = this.getModsFromProps(nextProps);

        return this.props.numberOfEventsByDate !== nextProps.numberOfEventsByDate ||
            nextWeekModifiers.clsMods.length !== 0 ||
            nextWeekModifiers.clsMods.length !== thisWeekModifiers.clsMods.length;
    }

    render() {
        const { mods, date } = this.props;
        let clsMods, events, week, { day } = this.props;

        week = getModsByCompType('week', mods);
        const modifiers = getMods(week, date, clsPrefix, 'week');

        if (modifiers) {
          clsMods = modifiers.clsMods;
          events = modifiers.events;
        }

        if (!day) {
          day = getModsByCompType('day', mods);
        }

        return (
          <div key="days" className={ classnames(clsPrefix, clsMods) } { ...events }>
            { renderWeekHeader(this.props) }
            { makeWeekNumber(this.props) }
            <div className={ classnames(`${clsPrefix}-days`) }>
              {
                daysOfWeek(date).map((date, i) => {
                  let outside;

                  if (this.props.edges) {
                    outside = Boolean(this.props.edges.find((edge, j) => edge.isSame(date, 'month', 'week', 'year')));
                  }

                  return (
                    <Day
                      outside={ !!outside }
                      key={ `day-${i}` }
                      date={ date }
                      mods={ day }
                      numberOfEventsByDate={ this.props.numberOfEventsByDate }
                      annotations={ this.props.annotations }/>
                  )
                })
              }
            </div>
          </div>
        );
    }
};

Week.propTypes = {
  weekHeader: PropTypes.bool,
  weekNumbers: PropTypes.bool,
  weekNumberFormat: PropTypes.string,
  weekdayFormat: PropTypes.string,
  numberOfEventsByDate: PropTypes.object,
  annotations: PropTypes.array
};

Week.defaultProps = {
  weekHeader: false,
  weekNumbers: false,
  weekNumberFormat: 'w',
  weekdayFormat: 'dd'
};

export default Week;
