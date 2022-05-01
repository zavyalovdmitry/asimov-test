import React from 'react';
import { Container, Item } from './styles/hours';

export default function Hours({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Hours.Item = function HoursItem({ children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};
