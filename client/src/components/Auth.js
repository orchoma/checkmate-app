import {useState} from 'react'
import {useCookies} from 'react-cookie'
import { useEffect } from 'react'

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [isLogIn, setIsLogin] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    
    console.log(cookies)

    const viewLogin = (status) => {

      setError(null)
      setIsLogin(status)

    }


    const validateEmail = () => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
      } else {
        setError('');
      }
    }


    const validatePassword = () => {
      if (!isLogIn && password !== confirmPassword) {
        setError('Make Sure Passwords Match!')
      } 
    }


    const handleSubmit = async (e, endpoint) => {
      e.preventDefault() 

      validateEmail();
      validatePassword();

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({email, password})
        
        })

        const data = await response.json() 

        if (data.detail){
          setError(data.detail)
        } else{
          setCookie('Email' , data.email)
          setCookie('AuthToken' , data.token)

          window.location.reload()
        }

    }



    return (
      <div className="auth-container" style={{marginTop : !isLogIn ? '.5rem' : '2.75rem'}}>
        <div className="auth-container-box">

          <div className='logo-container'>
            <img className='logo' src='./Task.svg' alt='Check Mate Logo depicting a cursor pointer checking a box with the word, Check, above it, and the word, Mate, to the right'/> 
          </div>

          <form>

          <input 
          className='input'
          type="email" 
          placeholder="email" 
          onChange={(e) => setEmail(e.target.value)}/>

          <input 
          className='input'
          type="password" 
          placeholder="password" 
          onChange={(e) => setPassword(e.target.value)}/> 

          { !isLogIn && <input 
          className='input'
          type="password" 
          placeholder="confirm password" 
          onChange={ (e) => setConfirmPassword(e.target.value)}/> }

          <input className="create" type="submit" 
          onClick={ (e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} /> 
          {error}

          </form>

          <div className='auth-options'>

            <button onClick={() => viewLogin(false)} 

            style={{color : isLogIn ? 'black' : 'white'}}> 
            sign up 
            
            </button>

            <button onClick={() => viewLogin(true)} 

            style={{color : !isLogIn ? 'black' : 'white'}}
            > log in 
            
            </button>
            
          </div>

         
        </div>
        
      </div>
    )
  }
  
  export default Auth
  
