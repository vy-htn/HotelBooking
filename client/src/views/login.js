import React, { useState, useEffect } from 'react';
import '../css/register.css';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function validate() {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      setEmailError('Email is not valid');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate phone
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }


    return isValid;
  }

  async function login() {
        if (validate()) {
        // Check if the user already exists
        const user = {
            email,
            password,
        }
      
            const registerResponse = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
              });
        
              if (registerResponse.ok) {
                // Registration successful
                const data = await registerResponse.json()
                console.log(data);
                window.localStorage.setItem("token",data.token);
                window.location.href="/"
                alert(data.message)
              } else {
                // Handle registration failure
                const error = await registerResponse.json()
                alert(error.message)
                console.log(error)
              }
        } 
    
         
        
    }
  
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5 mt-5">
        <div className='bs'>
        <h2>Login</h2>
        <input 
          type="text" 
          className="form-control" 
          placeholder="email" 
          value={email} 
          onChange={(e) => { setEmail(e.target.value) }} 
        />
        {emailError && <p>{emailError}</p>}
        <input 
          type="password" 
          className="form-control" 
          placeholder="password" 
          value={password} 
          onChange={(e) => { setPassword(e.target.value) }} 
        />
        {passwordError && <p>{passwordError}</p>}
      
        <button className='btn btn-primary mt-3' onClick={login} >LOGIN</button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
