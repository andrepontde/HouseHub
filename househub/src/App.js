import React  from 'react'
import  {TheMainNavBar} from './components/main-nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginCard from './components/login-card'

function App(){
  return (
    <div>
    <TheMainNavBar/>
      <LoginCard/>
    </div>
  )
}

export default App