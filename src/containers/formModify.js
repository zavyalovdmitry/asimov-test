import React, { useState, useEffect } from 'react';
import { Form } from '../components';
import { InfoContainer } from './';
import { API, API_BOOKINGS, API_UNBOOK } from '../constants';

export default function FormModifyContainer({
  setCurrentBooking,
  setMode,
  setFormMessage,
}) {
  const [clientCode, setClientCode] = useState('');
  const [bookingFound, setBookingFound] = useState(false);
  const [message, setMessage] = useState(
    'Already have a booking? Use your code to make any changes to it.'
  );

  const searchHandle = () => {
    if (clientCode.length !== 7) {
      alert('Please, enter valid 7-digits code');
      return;
    }
    setMessage('Please wait...');
    fetch(`${API}${API_BOOKINGS}/${clientCode}`)
      .then((response) => {
        if (response.status === 409) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          setCurrentBooking(data);
          setBookingFound(true);
          setMessage('You can change date/time of your booking or cancel it.');
        } else {
          console.log('not found');
          setMessage(
            'Booking not found. Please, check if your code is correct.'
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!bookingFound) {
      setClientCode('');
    }
  }, [bookingFound]);

  const unbookHandle = () => {
    if (window.confirm('Are you sure you want to cancel your dance?')) {
      fetch(`${API}${API_UNBOOK}/${clientCode}`).then((response) => {
        if (response.status === 409) {
          return;
        }
        setBookingFound(false);
        setMode('add');
        setCurrentBooking({
          date: '',
          time: '',
          changeCode: '',
          clientName: '',
          clientEmail: '',
        });
      });

      alert('You have succesfully canceled your dance.');
    }
  };

  const changeHandle = () => {
    setMode('change');
    setFormMessage('Choose a new date for your dance.');
  };

  return (
    <Form>
      <hr width="350" size="1" color="#a0a096" style={{ marginTop: '20px' }} />
      <InfoContainer info={message} />
      <Form.Input
        placeholder="your code"
        type="text"
        onChange={(e) => setClientCode(e.target.value)}
        disabled={bookingFound || message === 'Please wait...'}
      />
      <Form.Button
        onClick={() => searchHandle()}
        disabled={!clientCode || bookingFound || message === 'Please wait...'}
      >
        Modify booking
      </Form.Button>
      {bookingFound ? (
        <>
          <Form.Button onClick={() => changeHandle()} disabled={!clientCode}>
            Change
          </Form.Button>
          <Form.Button onClick={() => unbookHandle()} disabled={!clientCode}>
            Unbook
          </Form.Button>
        </>
      ) : null}
    </Form>
  );
}
