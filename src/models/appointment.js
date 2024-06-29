import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    title: String,
    date: Date,
    startTime: String,
    endTime: String,
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Appointment = mongoose.model('Appointments', appointmentSchema);

export default Appointment;