import React from 'react';
import { Hours } from '../components';

export default function HoursContainer({
  times,
  activeTime,
  setActiveTime,
  setShowForm,
  setShowTimes,
}) {
  return (
    <Hours>
      {times.map((item, ind) => (
        <Hours.Item
          key={ind}
          className={item === activeTime ? 'active' : 'inactive'}
          onClick={() => {
            setActiveTime(item);
            setShowForm(true);
            setShowTimes(false);
          }}
        >
          {item}
        </Hours.Item>
      ))}
    </Hours>
  );
}
