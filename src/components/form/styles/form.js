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
  border-radius: 5px;
  font-family: Hahmlet, Helvetica, sans-serif;
  line-height: 1.25em;
`;

export const Button = styled.button`
  width: 170px;
  margin: 10px 0 0 0;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #a0a096;
  font-family: Hahmlet, Helvetica, sans-serif;
  line-height: 1.25em;
  cursor: pointer;
  background: white;

  &:enabled:hover {
    background-color: #e6e6e6;
  }

  &:disabled {
    cursor: default;
  }
`;
