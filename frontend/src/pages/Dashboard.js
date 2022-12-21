import { useEffect, useState } from "react"
import axios from "axios"
import EventForm from "../components/EventForm"
import EventItem from "../components/EventItem"

function Dashboard() {
  const [events, setEvents] = useState([]) 

  useEffect(
      ()=>{
        axios
        .get("http://localhost:5000/api/events/")
        .then(
          res => {
            setEvents(res.data)
        }
          )
        .catch(
          err => console.log(err)
        )
      }
    ,)
  return (
    <>
    <section className='heading'>
      <p>Events Dashboard</p>
    </section>

    <EventForm />

    <section className='content'>
      {events.length > 0 ? (
        <div className='events'>
          {events.map((event) => (
            <EventItem key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <h3>You have not set any events</h3>
      )}
    </section>
  </>
  )
}

export default Dashboard