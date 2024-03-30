import React, { useState } from 'react'
import Header from '../components/Common/Header/Header';
import SignupForm from '../components/SignUpComponent/SignUpForm/Index';
import LoginForm from '../components/SignUpComponent/LoginForm/Index';

function SignUpPage() {

  const [flag, setFlag] = useState(false)

  return (
    <div><Header />
      <div className="input-wrapper space">
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <SignupForm /> : <LoginForm />}
        {!flag ? <p onClick={() => setFlag(!flag)}>Already have an Account? Click here to <span className='login'>Login</span>.</p> : <p onClick={() => setFlag(!flag)}>Don't have an account? Click here to <span className='login'>Signup</span>.</p>}
      </div>
    </div>
  )
}

export default SignUpPage;