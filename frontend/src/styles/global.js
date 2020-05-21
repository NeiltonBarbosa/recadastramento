import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-datepicker/dist/react-datepicker.css';
import '~/assets/bootstrap.min.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
    background: #eee;
    font-size: 14px;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none !important;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  .active {
    background: rgba(255, 255, 255, 0.8);
    color: #006699 !important;
    text-decoration: none;
  }

  .empty {
    font-size: 14px;
    color: #3E3939;

  }

  .pagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    margin-top: 16px;

    li {

      a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        width: 32px;
        height: 32px;

        font-size: 16px;
        font-weight: bold;

        color: #006699;

        border-radius: 4px;
        
        cursor: pointer;

      }

      &:hover {
        background: #eee;
      }

      &.activ {
        background: #fff;
        border: 1px solid #ccc;
      }


      + li {
        margin-left: 8px;
      }
    }
  }

  @-webkit-keyframes slide-down {
    0% { opacity: 0; -webkit-transform: translateY(-100%); }   
    100% { opacity: 1; -webkit-transform: translateY(0); }
  }
  @-moz-keyframes slide-down {
    0% { opacity: 0; -moz-transform: translateY(-100%); }   
    100% { opacity: 1; -moz-transform: translateY(0); }
  }

  .select-css {
    padding: 0 24px 0 8px;
    width: 100%;
    max-width: 100%; 
    margin: 0;
    height: 40px;

    font-size: 14px;

    /* font-family: sans-serif; */
    /* font-weight: 700; */
    /* line-height: 1.3; */

    color: #3E3939;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.1);;
    border-radius: 4px;
    /* box-shadow: 0 1px 0 1px rgba(0,0,0,.04); */
    
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #eee;

    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #eee 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;

    &:focus {
      border: 1px solid #006699;
      box-shadow: 0px 0px 5px 1px rgba(0, 102, 153, 0.3);
    }
  }
  .select-css::-ms-expand {
      display: none;
  }
  
  .select-css option {
      font-weight:normal;
      padding: 10px;
  }

  .badge {
    font-size: 10px;
    font-weight: bold;

    padding: 4px 8px;

    border-radius: 4px;
    color: #FFF;
  }

  .badge-success {
    background: #21bf73;
  }

  .badge-danger {
    background: #ca3e47;
  }

  .col-sm-1, 
  .col-sm-2, 
  .col-sm-3, 
  .col-sm-4, 
  .col-sm-5, 
  .col-sm-6, 
  .col-sm-7, 
  .col-sm-8, 
  .col-sm-9, 
  .col-sm-10, 
  .col-sm-11, 
  .col-sm-12
  .col-md-1, 
  .col-md-2, 
  .col-md-3, 
  .col-md-4, 
  .col-md-5, 
  .col-md-6, 
  .col-md-7, 
  .col-md-8, 
  .col-md-9, 
  .col-md-10, 
  .col-md-11, 
  .col-md-12 {
    margin-bottom: 16px;
  }
`;
