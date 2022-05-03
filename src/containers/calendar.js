/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';
import { InfoContainer } from './';
import { formatDate } from '../utils';
import { TIMES_INIT } from '../constants';

export default function CalendarContainer({
  bookings,
  date,
  setDate,
  setTimes,
  setActiveTime,
  setShowTimes,
  disabledDates,
  setShowForm,
  setFormMessage,
  formMessage,
  mode,
  setMode,
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
    setShowForm(false);
    setFormMessage(mode === 'change' ? 'Pick a new hour' : 'Pick an hour');
    setMode(mode === '' ? 'add' : mode);
  };

  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === -1;
  }

  function tileDisabled({ date, view }) {
    if (view === 'month') {
      return disabledDates.find((dDate) =>
        isSameDay(new Date(dDate), new Date(date))
      );
    }
  }

  return (
    <>
      <Calendar
        onChange={(e) => calClickHandler(e)}
        value={date}
        minDate={new Date()}
        tileDisabled={tileDisabled}
      />
      <InfoContainer info={formMessage} />
    </>
  );
}
