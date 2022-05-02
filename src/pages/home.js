/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import {
  HeaderContainer,
  CalendarContainer,
  FormContainer,
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

  // let disabledDates = ['2022-05-04'];

  useEffect(() => {
    fetch(`${API}${API_BOOKINGS}`)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        // console.log(data);
        // dispatch(fetchVehiclesSuccess(vehicles));
        checkFullDates(data);
      })
      .catch((error) => {
        console.log(error);
        // dispatch(fetchVehiclesFailure(error.message));
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
    // console.log(disabledDates);
  };

  return (
    <>
      <HeaderContainer />
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
      />
      {showTimes ? (
        <HoursContainer
          times={times}
          activeTime={activeTime}
          setActiveTime={setActiveTime}
          setShowForm={setShowForm}
          setShowTimes={setShowTimes}
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
        />
      ) : null}
      {info ? <InfoContainer info={info} /> : null}
    </>
  );
}

export default Home;
