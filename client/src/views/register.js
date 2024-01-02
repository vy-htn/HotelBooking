import React, { useState, useEffect } from 'react';
import '../css/register.css';


function RegisterForm() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  
  const [firstnameError, setFirstNameError] = useState('');
  const [lastnameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCPasswordError] = useState('');

  function validate() {
    let isValid = true;

    // Validate firstname
    if (!firstname) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    // Validate lastname
    if (!lastname) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

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
    if (!phone) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Phone number is not valid');
      isValid = false;
    } else {
      setPhoneError('');
    }

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

    // Validate confirm password
    if (!cpassword) {
      setCPasswordError('Confirm password is required');
      isValid = false;
    } else if (cpassword !== password) {
      setCPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setCPasswordError('');
    }

    return isValid;
  }
  async function register() {
    if (validate()) {
      // Check if the user already exists
      const checkResponse = await fetch('http://localhost:3001/users/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const checkData = await checkResponse.json();
  
      if (checkData.exists) {
        alert('User with this email already exists. Please use a different email.');
      } else {
        // Proceed with the registration
        const user = {
          firstname,
          lastname,
          email,
          phone,
          password,
          cpassword,
        };
  
        // Send a request to register the user
        const registerResponse = await fetch('http://localhost:3001/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
  
        if (registerResponse.ok) {
          
          alert('Member Registered Successfully');
        } else {
          // Handle registration failure
          alert('Registration failed. Please try again.');
        }
      }
    } else {
      alert('Invalid information');
    }
  }
  

 
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5 mt-5">
        <div className='bs'>
        <h2>Register</h2>
        <input 
          type="text" 
          className="form-control" 
          placeholder="firstname" 
          value={firstname} 
          onChange={(e) => { setFirstName(e.target.value) }} 
        />
        {firstnameError && <p>{firstnameError}</p>}
        <input 
          type="text" 
          className="form-control" 
          placeholder="lastname" 
          value={lastname} 
          onChange={(e) => { setLastName(e.target.value) }} 
        />
        {lastnameError && <p>{lastnameError}</p>}

        <input 
          type="text" 
          className="form-control" 
          placeholder="email" 
          value={email} 
          onChange={(e) => { setEmail(e.target.value) }} 
        />
        {emailError && <p>{emailError}</p>}
        <input 
          type="text" 
          className="form-control" 
          placeholder="phone" 
          value={phone} 
          onChange={(e) => { setPhone(e.target.value) }} 
        />
        {phoneError && <p>{phoneError}</p>}
        <input 
          type="password" 
          className="form-control" 
          placeholder="password" 
          value={password} 
          onChange={(e) => { setPassword(e.target.value) }} 
        />
        {passwordError && <p>{passwordError}</p>}
        <input 
          type="password" 
          className="form-control" 
          placeholder="confirm password" 
          value={cpassword} 
          onChange={(e) => { setCPassword(e.target.value) }} 
        />
        {cpasswordError && <p>{cpasswordError}</p>}
        <button className='btn btn-primary mt-3' onClick={register} >BECOME A MEMBER</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
