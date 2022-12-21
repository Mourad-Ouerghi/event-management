import { useState } from 'react'
import axios from 'axios'
import  {toast}  from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

function Details() 
{
    const {id} = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        eventName: '',
        eventDescription: '',
        eventStartDate: '',
        eventEndDate: '',
      })
      const { eventName, eventDescription, eventStartDate, eventEndDate } = formData
    
      const onChange = (e)=>{
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
      const onSubmit = async (e) => 
      {
        e.preventDefault()
          try {
            const response = await axios.put(`http://localhost:5000/api/events/${id}`,
            JSON.stringify({eventName, eventDescription, eventStartDate, eventEndDate}),
            {
              headers : {'content-type': 'application/json'},
              withCredentials: true,
            }
            )
            toast.success('Event successfully updated')
            console.log(response.data)
            navigate("/dashboard")
          } catch (error) {
                if(!error.response)
                {
                toast.error('No server response')
                }
                else if (error.response.status === 400){
                toast.error('Make sure all the input fields are filled')
                }
                else{
                toast.error('Make sure the start date is before the end date')
                }
          }
        }
      
  return (
    <>
    <section className='heading'>
      <p>Update Event</p>
    </section>
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='eventName'
            name='eventName'
            value={eventName}
            placeholder='Enter the event name'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='eventDescription'
            name='eventDescription'
            value={eventDescription}
            placeholder='Enter the event description'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='eventStartDate'
            name='eventStartDate'
            value={eventStartDate}
            placeholder='Enter the date in this format YY-MM-DD'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='eventEndDate'
            name='eventEndDate'
            value={eventEndDate}
            placeholder='Enter the date in this format YY-MM-DD'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
             Update this event
          </button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Details