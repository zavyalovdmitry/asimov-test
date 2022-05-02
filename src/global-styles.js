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
    background-image: linear-gradient(to right, rgba(255,255,255, 0.8) 0 100%), url(img/pic.jpg);

    // background: url(img/pic.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  html, body {
    height: 100%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // text-transform: none;
    // user-select: none;
    // padding: 0;
    // background-color: #fcfcfc;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    margin-top: 100px;
    // width: 100%;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
  }
`;
