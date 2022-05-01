import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 350px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Input = styled.input`
  width: 170px;
  text-align: center;
  margin: 10px 0 0 0;
  padding: 5px;
  border: 1px solid #a0a096;
  // border-radius: 5px;

  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;
  // cursor: pointer;

  &:hover,
  &:active {
    // background-color: #e6e6e6;
  }
`;

export const Button = styled.button`
  width: 170px;
  // text-align: center;
  margin: 10px 0 0 0;
  padding: 5px;
  // border: 1px solid #a0a096;
  // border-radius: 5px;

  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.125em;
  // cursor: pointer;

  // &:hover,
  // &:active {
  //   // background-color: #e6e6e6;
  // }
`;
