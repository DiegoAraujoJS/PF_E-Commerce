import React from 'react';
// import ReactDOM from 'react-dom';
import CalendarApp from './CalendarApp';



export default function Calendar(email){
  console.log("LLega email", email)
 
  return (
  <React.StrictMode>
    <CalendarApp {...email}/>
  </React.StrictMode>
  )
}
