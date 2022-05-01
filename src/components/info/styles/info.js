import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 350px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Text = styled.p`
  width: 100%;
  text-align: center;
  margin: 10px 0 0 0;
  padding: 15px;
  border: 1px solid #a0a096;
  // border-radius: 5px;
  background: white;
  word-break: unset;
  word-wrap: unset;
  overflow-wrap: unset;
  -webkit-hyphens: unset;
  -moz-hyphens: unset;
  -ms-hyphens: unset;
  hyphens: unset;

  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;
  // cursor: pointer;

  // &:hover {
  //   background-color: #e6e6e6;
  // }

  // &.active {
  //   background: #006edc;
  //   color: white;
  //   border: 1px solid #006edc;
  // }
`;
