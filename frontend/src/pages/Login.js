import { useNavigate, useLocation, Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import axios from 'axios'
import useAuth from '../hooks/useAuth'

function Login() {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
    })
  const { setAuth } = useAuth()
  const { email, password } = formData
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/home"

  const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
  const onSubmit =async (e)=>{
      e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/users/',
              JSON.stringify({email, password}),
              {
                headers : {'content-type': 'application/json'},
                withCredentials: true,
              }
            )
            toast.success('Successfully signed in')
            console.log(response.data)
            const token = response.data.token
            const roles = response.data.roles
            setAuth({email, password, roles, token})
            setFormData({
              email: '',
              password: '',
            })
            navigate(from, {replace: true});
          } catch (error) {
              if(!error.response)
              {
                toast.error('No server response')
              }
              else if (error.response.status === 400){
                toast.error('Missing username or password')
              }
              else if (error.response.status === 401){
                toast.error('Unauthorized')
              }
              else{
                toast.error('Login Failed')
              }
          }
    }
  return (
    <>
    <section className='heading'>
      <h1>
        Login
      </h1>
      <p>Login and start discovering events</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            placeholder='Enter password'
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Sign In
          </button>
        </div>
      </form>
    </section>
    <section>
        You don't have an account ? <Link to="/register">Sign Up here</Link>
    </section>
  </>
  )
}

export default Login