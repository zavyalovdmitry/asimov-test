import React from 'react';
import { Container, Text } from './styles/info';

export default function Info({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Info.Text = function InfoText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};
