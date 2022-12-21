import {useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import {Link} from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const navigate = useNavigate()
  const { name, email, password, password2 } = formData

  const onChange = (e)=>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
      return;
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/users/register/',
        JSON.stringify({name, email, password}),
        {
          headers : {'content-type': 'application/json'},
          withCredentials: true,
        }
        )
        toast.success('Successfully registred')
        console.log(response.data)
        setFormData({
          name: '',
          email: '',
          password: '',
          password2: '',
        })
        navigate("/")
      } catch (error) {
        if(!error.response)
        {
          toast.error('No server response')
        }
        else if (error.response.status === 400){
          toast.error('Make sure all the fields are filled')
        }
        else{
          toast.error('Registration Failed')
        }
      }
    }
  }

  return (
    <>
    <section className='heading'>
      <h1>
        Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={name}
            placeholder='Enter your name'
            onChange={onChange}
          />
        </div>
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
          <input
            type='password'
            className='form-control'
            id='password2'
            name='password2'
            value={password2}
            placeholder='Confirm password'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Sign Up 
          </button>
        </div>
      </form>
    </section>
    <section>
        You already have an account ? <Link to="/">Sign In here</Link>
    </section>
  </>
  )
}

export default Register