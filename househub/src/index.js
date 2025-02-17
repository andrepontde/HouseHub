import React from 'react';
import ReactDOM from 'react-dom/client';
import  {TheMainNavBar} from './components/main-nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginCard from './components/loginCard'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.Fragment>
   <TheMainNavBar/>
    <LoginCard/>
  </React.Fragment>
);


