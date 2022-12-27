import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import moment from "moment"

function EventItem({ event }) {
    const navigate = useNavigate()
    const deleteEvent = async ()=>{
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/events/${event._id}`
            )
            console.log(response.data)
            toast.success("Event successfully deleted")
        } catch (error) {
            console.log(error.message)
        }
    }
    const updateEvent = () => {
        navigate(`/details/${event._id}`)
    } 
    return (
      <div className='event'>
        {/* <div>{new Date(event.createdAt).toLocaleString('en-US')}</div> */}
        <h3>{event.eventName}</h3>
        <p className='description'>Start date : {moment(new Date(event.eventStartDate).toLocaleString('en-US')).format('LL')}</p>
        <p className='description'>End date : {moment(new Date(event.eventEndDate).toLocaleString('en-US')).format('LL')}</p>
        <img src={event.eventImage}></img>
        <p className='description'>{event.eventDescription}</p>
        <button onClick={deleteEvent} className='close'>
          X
        </button>
        <button  onClick={updateEvent}className='btn-reverse'>
          edit
        </button>
      </div>
    )
  }
  
  export default EventItem