const express = require ('express')
const router = express.Router()
const {getEvents,setEvent,updateEvent,deleteEvent}= require('../controllers/eventController')
const {protect} = require('../middleware/authMidlleware')

router.route('/').get(getEvents).post(setEvent)

router.route('/:id').put(updateEvent).delete(deleteEvent)


module.exports = router