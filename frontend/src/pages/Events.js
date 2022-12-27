import axios from "axios"
import { useEffect, useState } from "react"
import moment from "moment"


function Events() {

  const[events, setEvents] = useState([])
  useEffect(
      ()=> {
        axios.get("http://localhost:5000/api/events/")
        .then(
          (res)=> {
            setEvents(res.data)
          }
        )
        .catch(
          (error)=> {
            console.log(error)
          }
        )
      }
  )

  return (
    <>
    <section className="heading">
      <p>Events page</p>
    </section>
    <section className="content">
      {
        events.length>0?(
          <div className="events">
            {
              events.map((event)=>(
              <div key={event._id} className='event'>
                {/* <div>{new Date(event.createdAt).toLocaleString('en-US')}</div> */}
                <h3>{event.eventName}</h3>
                <p className='description'>Start date : {moment(new Date(event.eventStartDate).toLocaleString('en-US')).format('LL')}</p>
                <p className='description'>End date : {moment(new Date(event.eventEndDate).toLocaleString('en-US')).format('LL')}</p>
                <img src={event.eventImage}></img>
                <p className='description'>{event.eventDescription}</p>
              </div>
              ))
            }
          </div>
        ):
        <h3>There are no events planned.</h3>
      }
    </section>
    </>
  )
}

export default Events