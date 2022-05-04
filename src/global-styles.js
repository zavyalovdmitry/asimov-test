import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Hahmlet';
    font-style: normal;
    font-weight: 200;
    src: url('../fonts/Hahmlet.ttf');
  }

  @font-face {
    font-family: 'PaintDrops';
    font-style: normal;
    font-weight: 200;
    src: url('../fonts/PaintDropsRegular.ttf');
  }

  * {
    box-sizing: border-box;
  }

  html {
    background-image: linear-gradient(to right, rgba(255,255,255, 0.9) 0 100%), url(img/pic.jpg);
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  html, body {
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    padding-bottom: 50px;
  }
`;
