import React from 'react';
import { Container, Caption } from './styles/header';

export default function Header({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Header.Caption = function HeaderCaption({ children, ...restProps }) {
  return <Caption {...restProps}>{children}</Caption>;
};
