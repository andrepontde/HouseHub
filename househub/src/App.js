import React  from 'react'
import  {TheMainNavBar} from './components/main-nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginCard from './components/login-card'
import RegisterCard from './components/register-card';
import { Button } from 'react-bootstrap';

function App(){
  const [showLogin, setShowLogin] = React.useState(true);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      <TheMainNavBar />
      {showLogin ? (
        <div>
          <LoginCard onToggle={handleToggle} />
        </div>
      ) : (
        <div>
          <RegisterCard onToggle={handleToggle} />
        </div>
      )}
    </div>
  );
}

export default App