import React, { useState } from 'react';
import { Form } from '../components';
import { API, API_BOOKINGS, API_UNBOOK } from '../constants';

export default function FormModifyContainer() {
  const [clientCode, setClientCode] = useState('');
  const [currentBooking, setCurrentBooking] = useState({});
  const [bookingFound, setBookingFound] = useState(false);

  const searchHandle = () => {
    if (clientCode.length !== 7) {
      alert('Please, enter valid 7-digits code');
      return;
    }

    fetch(`${API}${API_BOOKINGS}/${clientCode}`)
      .then((response) => {
        if (response.status === 409) {
          // console.log('nope');
          return;
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        if (data) {
          setCurrentBooking(data);
          setBookingFound(true);
        } else {
          console.log('not found');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unbookHandle = () => {
    if (window.confirm('Are you sure you want to unbook your dance?')) {
      fetch(`${API}${API_UNBOOK}/${clientCode}`)
        .then((response) => {
          if (response.status === 409) {
            // console.log('nope');
            return;
          }
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          // setCurrentBooking(data);
          setBookingFound(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Form>
      <hr width="350" size="1" color="#a0a096" style={{ marginTop: '20px' }} />
      <p
        style={{
          color: '#757575',
          fontFamily: 'Hahmlet, Helvetica, sans-serif',
        }}
      >
        Already have a booking? Use your code to make any changes to it:
      </p>
      <Form.Input
        placeholder="your code"
        type="text"
        onChange={(e) => setClientCode(e.target.value)}
        disabled={bookingFound}
      />
      <Form.Button
        onClick={() => searchHandle()}
        disabled={!clientCode || bookingFound}
      >
        Modify booking
      </Form.Button>
      {bookingFound ? (
        <>
          <Form.Button onClick={() => searchHandle()} disabled={!clientCode}>
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
