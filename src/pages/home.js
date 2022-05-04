/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import {
  HeaderContainer,
  CalendarContainer,
  FormContainer,
  FormModifyContainer,
  HoursContainer,
  InfoContainer,
} from '../containers';

import { TIMES_INIT, API, API_BOOKINGS, BLANK_DATA } from '../constants';

function Home() {
  const [date, setDate] = useState(new Date());
  const [times, setTimes] = useState([]);
  const [activeTime, setActiveTime] = useState('');
  const [bookings, setBookings] = useState([]);
  const [showTimes, setShowTimes] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [disabledDates, setDisabledDates] = useState([]);
  const [mode, setMode] = useState('');
  const [currentBooking, setCurrentBooking] = useState(BLANK_DATA);
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    fetch(`${API}${API_BOOKINGS}`)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        checkFullDates(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const checkFullDates = (data) => {
    const arr = data.map((item) => item.date);
    const arr2 = [...new Set(arr)];

    const arr3 = arr2.filter(
      (item) =>
        [...data].filter((subItem) => subItem.date === item).length ===
        TIMES_INIT.length
    );

    setDisabledDates([...arr3]);
  };

  return (
    <>
      <HeaderContainer />
      {bookings.length ? (
        <>
          <CalendarContainer
            bookings={bookings}
            date={date}
            setDate={setDate}
            setTimes={setTimes}
            setActiveTime={setActiveTime}
            setShowTimes={setShowTimes}
            disabledDates={disabledDates}
            setShowForm={setShowForm}
            formMessage={formMessage}
            setFormMessage={setFormMessage}
            mode={mode}
            setMode={setMode}
          />
          {showTimes ? (
            <HoursContainer
              times={times}
              activeTime={activeTime}
              setActiveTime={setActiveTime}
              setShowForm={setShowForm}
              setShowTimes={setShowTimes}
              setFormMessage={setFormMessage}
              mode={mode}
            />
          ) : null}
          {showForm ? (
            <FormContainer
              date={date}
              time={activeTime}
              bookings={bookings}
              setActiveTime={setActiveTime}
              setShowForm={setShowForm}
              setShowTimes={setShowTimes}
              setBookings={setBookings}
              checkFullDates={checkFullDates}
              currentBooking={currentBooking}
              mode={mode}
              setFormMessage={setFormMessage}
              setMode={setMode}
            />
          ) : null}
          {mode === '' ? (
            <FormModifyContainer
              setCurrentBooking={setCurrentBooking}
              setMode={setMode}
              setFormMessage={setFormMessage}
            />
          ) : null}
        </>
      ) : (
        <InfoContainer info={'Loading data...'} />
      )}
    </>
  );
}

export default Home;
