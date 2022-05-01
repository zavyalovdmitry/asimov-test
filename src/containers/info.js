import React from 'react';
import { Info } from '../components';

export default function InfoContainer({ info }) {
  return (
    <Info>
      <Info.Text>{info}</Info.Text>
    </Info>
  );
}
