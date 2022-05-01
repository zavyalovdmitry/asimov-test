/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import { formatDate } from '../utils';
import { TIMES_INIT } from '../constants';

export default function CalendarContainer({
  bookings,
  date,
  setDate,
  setTimes,
  setActiveTime,
  setShowTimes,
  setInfo,
}) {
  const getTimes = (e) => {
    const data = bookings.filter((item) => item.date === formatDate(e));
    const timesBusy = data.map((item) => item.time);

    setTimes(TIMES_INIT.filter((item) => !timesBusy.includes(item)));
  };

  useEffect(() => {
    getTimes(date);
  }, []);

  const calClickHandler = (e) => {
    setDate(e);
    setActiveTime('');
    getTimes(e);
    setShowTimes(true);
    setInfo('');
  };

  return (
    <Calendar
      onChange={(e) => calClickHandler(e)}
      value={date}
      minDate={new Date()}
    />
  );
}
