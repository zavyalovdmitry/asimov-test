/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Form } from '../components';
import { formatDate, makeCode } from '../utils';
import { API, API_BOOK } from '../constants';

export default function FormContainer({
  bookings,
  date,
  time,
  setActiveTime,
  setShowForm,
  setShowTimes,
  setBookings,
  checkFullDates,
  currentBooking,
  setFormMessage,
  mode,
  setMode,
}) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submitHandle = () => {
    if (!validateEmail(clientEmail)) {
      alert('Please, enter valid email!');
      return;
    }

    const bookDate = formatDate(date);
    const changeCode = mode === 'add' ? makeCode(7) : currentBooking.changeCode;

    const newBooking = {
      date: bookDate,
      time,
      changeCode,
      clientName,
      clientEmail,
    };

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBooking),
    };

    setShowForm(false);
    setFormMessage('Saving data...');

    (async () => {
      const rawResponse = await fetch(`${API}${API_BOOK}`, options);

      if (rawResponse.status === 200) {
        setMode(mode === 'change' ? 'add' : mode);
        setFormMessage(
          `Your appointment was scheduled to ${
            newBooking.date
          } at ${newBooking.time.slice(
            0,
            5
          )}. You will have just one hour so be prepared! Use this code ${
            newBooking.changeCode
          } to make any changes to your reservation, but better don't.`
        );
      } else if (rawResponse.status === 409) {
        setFormMessage(
          'You already have a scheduled appointment, more would be too much.'
        );
      }

      setActiveTime('');

      if (rawResponse.status === 200) {
        checkFullDates([...bookings, newBooking]);
        setBookings([...bookings, newBooking]);
      }
    })();
  };

  useEffect(() => {
    if (mode === 'change') {
      setClientName(currentBooking.clientName);
      setClientEmail(currentBooking.clientEmail);
    }
  }, []);

  return (
    <Form>
      <Form.Input
        placeholder="your name"
        type="text"
        onChange={(e) => setClientName(e.target.value)}
        disabled={mode === 'change'}
        value={clientName}
      />
      <Form.Input
        placeholder="your email"
        type="email"
        onChange={(e) => setClientEmail(e.target.value)}
        disabled={mode === 'change'}
        value={clientEmail}
      />
      <Form.Button
        onClick={() => submitHandle()}
        disabled={!(clientName && clientEmail && time && date)}
      >
        {mode === 'add' ? 'Book' : 'Change'}
      </Form.Button>
      <Form.Button
        onClick={() => {
          setShowForm(false);
          setShowTimes(true);
          mode === 'change' ? setMode('add') : null;
        }}
      >
        Cancel
      </Form.Button>
    </Form>
  );
}
