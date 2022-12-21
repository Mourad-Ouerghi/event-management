const asyncHandler = require('express-async-handler')

const Event = require('../models/eventModel')
const User = require('../models/userModel')


//@desc Get events
//@route GET/api/events
//@access Private

const getEvents = asyncHandler(async (req, res )=>{
    const events = await Event.find({})
    res.status(200).json(events)
})

//@desc Set events
//@route POST /api/events
//@access Private
const setEvent = asyncHandler(async (req, res)=>{
    if(!req.body.eventName || !req.body.eventDescription || !req.body.eventStartDate || !req.body.eventEndDate)
    {
        res.status(400).json({message : "Please make sure all the fields are filled"})
        throw new Error('Please make sure all the fields are filled')
    }
    const startDate = new Date(req.body.eventStartDate.toString())
    const endDate = new Date(req.body.eventEndDate.toString())
    if(endDate < startDate){
        res.status(406).json({message : "endDate can't be before startDate"})
        throw new Error("endDate can't be before startDate")
    }

    const event = await Event.create({
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        eventStartDate: startDate,
        eventEndDate: endDate,
    })

    res.status(200).json(event)
})

//@desc Delete events
//@route DELETE /api/events/:id
//@access Private
const deleteEvent = asyncHandler(async (req, res )=>{
    const event = await Event.findById(req.params.id)
    if(!event)
    {
        res.status(400).json({message : "Event not found"})
        throw Error('Event not found')
    }
    await event.remove()
    res.status(200).json({message : `event ${req.params.id} deleted`})
})

//@desc Update events
//@route PUT /api/events/:id
//@access Private
const updateEvent = asyncHandler(async (req, res )=>{
    const event = await Event.findById(req.params.id)
    if(!event)
    {
        res.status(404)
        throw new Error('Event not found')
    }
    if(req.body.eventName==="" || !req.body.eventDescription==="" || !req.body.eventStartDate===null || !req.body.eventEndDate===null)
    {
        res.status(400)
        throw new Error('Please make sure all the fields are filled')
    }
    const startDate = new Date(req.body.eventStartDate.toString())
    const endDate = new Date(req.body.eventEndDate.toString())
    if(endDate < startDate){
        res.status(406).json({message : "endDate can't be before startDate"})
        throw new Error("endDate can't be before startDate")
    }
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true,})
    event.update(req.body)
    res.status(200).json(updatedEvent)
})

module.exports = {
    getEvents,
    setEvent,
    deleteEvent,
    updateEvent
}