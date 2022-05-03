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
import { TIMES_INIT, API, API_BOOKINGS } from '../constants';

function Home() {
  const [date, setDate] = useState(new Date());
  const [times, setTimes] = useState([]);
  const [activeTime, setActiveTime] = useState('');
  const [bookings, setBookings] = useState([]);
  const [showTimes, setShowTimes] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [info, setInfo] = useState('');
  const [disabledDates, setDisabledDates] = useState([]);
  const [mode, setMode] = useState('');
  const [currentBooking, setCurrentBooking] = useState({
    date: '',
    time: '',
    changeCode: '',
    clientName: '',
    clientEmail: '',
  });
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
      {/* <p>Still don't have a booking? book now</p> */}
      <CalendarContainer
        bookings={bookings}
        date={date}
        setDate={setDate}
        times={times}
        setTimes={setTimes}
        setActiveTime={setActiveTime}
        setShowTimes={setShowTimes}
        setInfo={setInfo}
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
          setInfo={setInfo}
          setBookings={setBookings}
          checkFullDates={checkFullDates}
          currentBooking={currentBooking}
          setCurrentBooking={setCurrentBooking}
          mode={mode}
          setFormMessage={setFormMessage}
          formMessage={formMessage}
        />
      ) : null}
      {/* {info ? <InfoContainer info={info} /> : null} */}
      {mode === '' ? (
        <FormModifyContainer
          currentBooking={currentBooking}
          setCurrentBooking={setCurrentBooking}
          mode={mode}
          setMode={setMode}
          setFormMessage={setFormMessage}
        />
      ) : null}
    </>
  );
}

export default Home;
