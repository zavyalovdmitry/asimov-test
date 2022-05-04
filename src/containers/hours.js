import React from 'react';
import { Hours } from '../components';

export default function HoursContainer({
  times,
  activeTime,
  setActiveTime,
  setShowForm,
  setShowTimes,
  setFormMessage,
  mode,
}) {
  const ckickHandler = (item) => {
    setActiveTime(item);
    setShowForm(true);
    setShowTimes(false);
    setFormMessage(
      mode === 'add'
        ? 'Enter your details and press Book to finish your reservation.'
        : 'Press Change to save your new reservation details.'
    );
  };

  return (
    <Hours>
      {times.map((item, ind) => (
        <Hours.Item
          key={ind}
          className={item === activeTime ? 'active' : 'inactive'}
          onClick={() => ckickHandler(item)}
        >
          {item}
        </Hours.Item>
      ))}
    </Hours>
  );
}
