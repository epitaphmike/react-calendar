import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { getMods } from './util';

const clsPrefix = 'rc-Day';

const renderHeader = (props) => {
  if (!props.dayHeader) {
    return null;
  }

  return (
    <header className={`${clsPrefix}-Day-header`}>
      { props.date.format(props.dayHeaderFormat) }
    </header>
  );
};

const renderAgenda = (props) => {
  if (!props.dayAgenda) {
    return null;
  }

  return (
    <div key="agenda" className={`${clsPrefix}-Day-agenda`}>
      { props.children }
    </div>
  );
};

const Day = (props) => {
  const clsPrefix = 'rc-Day';
  const { date, mods, outside } = props;
  const modifiers = getMods(mods, date, clsPrefix, 'day');

  let clsMods, events;

  if (modifiers) {
    clsMods = modifiers.clsMods;
    events = modifiers.events;
  }

  const clsDay = classnames(clsPrefix, { 'rc-Day--outside': outside }, clsMods);

  return (
    <div className={ clsDay } { ...events }>
      <div className={'rc-Day--date'}>{ date.format(props.dayFormat) }</div>
      <div className={'rc-Day--event-quantity'}>{ props.numberOfEventsByDate[date.format(props.fullYearMonthDayFormat)] || '' }</div>
    </div>
  );
};

Day.propTypes = {
  date: React.PropTypes.object.isRequired,
  dayAgenda: React.PropTypes.bool,
  dayHeader: React.PropTypes.bool,
  dayHeaderFormat: React.PropTypes.string,
  dayFormat: React.PropTypes.string,
  fullYearMonthDayFormat: React.PropTypes.string,
  mods: PropTypes.array,
  numberOfEventsByDate: PropTypes.object
};

Day.defaultProps = {
  dayAgenda: false,
  dayHeader: false,
  dayHeaderFormat: 'MMM Do',
  dayFormat: 'D',
  fullYearMonthDayFormat: 'YYYY-MM-DD'
};

export default Day;


