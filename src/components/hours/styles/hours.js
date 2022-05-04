import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 350px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Item = styled.p`
  width: 170px;
  text-align: center;
  margin: 10px 0 0 0;
  padding: 5px;
  border: 1px solid #a0a096;
  border-radius: 5px;
  background: white;
  font-family: Hahmlet, Helvetica, sans-serif;
  line-height: 1.25em;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }

  &.active {
    background: #006edc;
    color: white;
    border: 1px solid #006edc;
  }
`;
