import { useState } from 'react'
import axios from 'axios'
import  {toast}  from 'react-toastify'

function EventForm() 
{
    const [formData, setFormData] = useState({
        eventName: '',
        eventDescription: '',
        eventStartDate: '',
        eventEndDate: '',
        eventImage: '',
      })
      const { eventName, eventDescription, eventStartDate, eventEndDate, eventImage } = formData
    
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
            const response = await axios.post('http://localhost:5000/api/events/',
            JSON.stringify({eventName, eventDescription, eventStartDate, eventEndDate, eventImage}),
            {
              headers : {'content-type': 'application/json'},
              withCredentials: true,
            }
            )
            toast.success('Event successfully added')
            console.log(response.data)
            setFormData({
              eventName: '',
              eventDescription: '',
              eventStartDate: '',
              eventEndDate: '',
              eventImage: '',
            })
          } catch (error) {
              if(!error.response)
              {
                toast.error('No server response')
              }
              else if (error.response.status === 400){
                toast.error('Make sure all the input fields are filled')
              }
              else if (error.response.status === 406){
                toast.error("endDate can't be before startDate")
              }
              else{
                toast.error(error.message)
              }
          }
        }
      
  return (
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
        <input
            type='text'
            className='form-control'
            id='eventImage'
            name='eventImage'
            value={eventImage}
            placeholder='Enter the link of the event image'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
             Add this event
          </button>
        </div>
      </form>
    </section>
  )
}

export default EventForm