const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
    {
        eventName: {
            type: String,
            required: [true, 'Please add a text value']
        },
        eventDescription: {
            type: String,
            required: [true, 'Please add a text value']
        },
        eventStartDate: {
            type: Date,
            required: [true, 'Please add a text value']
        },
        eventEndDate: {
            type: Date,
            required: [true, 'Please add a text value']
        },
        eventImage: {
            type: String,
            required: [true, 'Please add an image']
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Event',eventSchema)