import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';
import '../assets/fonts/fonts.css'

const GlobalStyle = createGlobalStyle`
  ${reset}
    * {
      box-sizing: border-box;
    }

    html, body, p {
      font-family: 'NotoSansKRRegular';
    }

    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 12px;
      vertical-align: baseline;
    }

    button {
      font-family: 'NotoSansKRBold';
      border: none;
      background-color: #EFEFEF;
      border-radius: 20px;
      font-size: 16px;
    }

    input {
      border: none;
      outline: none;
    }

    ol, ul, li {
      list-style: none;
    }

    img {
      display: block;
      height: auto;
      width: 100%;
    }
`;

export default GlobalStyle;