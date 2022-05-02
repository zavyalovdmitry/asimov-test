import React, { useState } from 'react';
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
}) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  // const checkClient = () => {
  //   // return bookings.find((item) => item.clientEmail === clientEmail);
  //   console.log(clientEmail);
  //   console.log(bookings.find((item) => item.clientEmail === clientEmail));
  // };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submitHandle = () => {
    // if (!clientName || !clientEmail || !time || !date) return;

    // if (checkClient()) return;

    if (!validateEmail(clientEmail)) {
      alert('Please, enter valid email!');
      return;
    }

    const id = makeCode(9);
    const bookDate = formatDate(date);
    const changeCode = makeCode(7);

    const newBooking = {
      id,
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

      // const content = await rawResponse.json();
      setInfo(rawResponse.statusText);
      // console.log(rawResponse);

      setActiveTime('');
      setShowForm(false);

      if (rawResponse.status === 200) {
        checkFullDates([...bookings, newBooking]);
        setBookings([...bookings, newBooking]);
        // checkFullDates
      }
    })();
  };

  return (
    <Form>
      <Form.Input
        placeholder="your name"
        type="text"
        onChange={(e) => setClientName(e.target.value)}
      />
      <Form.Input
        placeholder="your email"
        type="email"
        onChange={(e) => setClientEmail(e.target.value)}
      />
      <Form.Button
        onClick={() => submitHandle()}
        disabled={!(clientName && clientEmail && time && date)}
      >
        Book
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
