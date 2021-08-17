import styled, { createGlobalStyle } from "styled-components";
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
    }
    button {
        background: lightseagreen;
        border: none;
        border-radius: 16px;
        padding: 6px 14px;
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