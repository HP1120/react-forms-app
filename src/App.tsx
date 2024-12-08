import React, { useState } from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import styles from './styles/App.module.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className={styles.toggleButton}
      >
        {isLogin ? 'Need an account?' : 'Already have an account?'}
      </button>
      {isLogin ? <Login /> : <Signup />}
    </div>
  );
}

export default App;