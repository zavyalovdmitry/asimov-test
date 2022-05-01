/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import {
  CalendarContainer,
  FormContainer,
  HoursContainer,
  InfoContainer,
} from '../containers';
import { API, API_BOOKINGS } from '../constants';

function Home() {
  const [date, setDate] = useState(new Date());
  const [times, setTimes] = useState([]);
  const [activeTime, setActiveTime] = useState('');
  const [bookings, setBookings] = useState([]);
  const [showTimes, setShowTimes] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [info, setInfo] = useState('');

  useEffect(() => {
    fetch(`${API}${API_BOOKINGS}`)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        console.log(data);
        // dispatch(fetchVehiclesSuccess(vehicles));
      })
      .catch((error) => {
        console.log(error);
        // dispatch(fetchVehiclesFailure(error.message));
      });
  }, []);

  return (
    <>
      <CalendarContainer
        bookings={bookings}
        date={date}
        setDate={setDate}
        times={times}
        setTimes={setTimes}
        setActiveTime={setActiveTime}
        setShowTimes={setShowTimes}
        setInfo={setInfo}
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
        />
      ) : null}
      {info ? <InfoContainer info={info} /> : null}
    </>
  );
}

export default Home;
