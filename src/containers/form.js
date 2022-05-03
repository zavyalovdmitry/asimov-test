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
  setInfo,
  setBookings,
  checkFullDates,
  currentBooking,
  formMessage,
  setFormMessage,
  mode,
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

    // const id = makeCode(9);
    const bookDate = formatDate(date);
    const changeCode = mode === 'add' ? makeCode(7) : currentBooking.changeCode;

    const newBooking = {
      // id,
      date: bookDate,
      time,
      changeCode,
      clientName,
      clientEmail,
    };

    console.log(newBooking);

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBooking),
    };

    (async () => {
      const rawResponse = await fetch(`${API}${API_BOOK}`, options);

      setInfo(rawResponse.statusText);
      setFormMessage(rawResponse.statusText);

      setActiveTime('');
      setShowForm(false);

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
        value={currentBooking.clientName}
      />
      <Form.Input
        placeholder="your email"
        type="email"
        onChange={(e) => setClientEmail(e.target.value)}
        disabled={mode === 'change'}
        value={currentBooking.clientEmail}
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
        }}
      >
        Cancel
      </Form.Button>
    </Form>
  );
}
