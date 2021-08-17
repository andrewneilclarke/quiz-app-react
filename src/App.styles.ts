import { createGlobalStyle } from "styled-components";
import BGImage from './img/beach.jpg'

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
        color: #333;
        text-align: center;
    }
    h1 {
        margin-bottom: 0;
    }
    p {
        margin-top: 0;
        font-size: 18px
    }
    .App .powered {
        margin-top: 0;
        font-size: 12px;
        color: darkturquoise;
    }
    
    button {
        background-color: rgba(0, 206, 209, 0.7);
        border: none;
        border-radius: 16px;
        padding: 6px 14px;
        margin: 10px;
    }

    body {
        background-image: url(${BGImage});
        background-size: cover;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
    }

    * {
        box-sizing: border-box;
        font-family: 'Catamaran', sans-serif;
    }
    .answer {
        margin: 6px 0;
    }
`