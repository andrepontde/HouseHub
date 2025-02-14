import React from 'react';
import ReactDOM from 'react-dom/client';
import  {TheMainNavBar} from './components/main-nav';
import 'bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.Fragment>
   <TheMainNavBar/>
  <h1 className='helloHeading'>Hello</h1>
 <h1>This is Amazing</h1>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
