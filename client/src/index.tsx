import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './components/context/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </React.StrictMode>,
  document.getElementById('root')
);
/////////////IMPORTANT//////////IMPORTANT///////////IMPORTANT///////////IMPORTANT///////////////////////////////
// Adding UserContext here will help send out context throughout the app if your planning on rerouting on app
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
