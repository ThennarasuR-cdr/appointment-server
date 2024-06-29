import User from "../models/user.js";
import Appointment from "../models/appointment.js";

const createAppointment = async (email,appointmentReq)=>{
    const user = await User.findOne({email:email});
    const appointment = new Appointment({
        title:appointmentReq.title,
        date:appointmentReq.date,
        startTime:appointmentReq.startTime,
        endTime:appointmentReq.endTime,
        status: 'Scheduled',
        user: user
    });
    await appointment.save();
};

const getAppointments = async (email, filterDate)=>{
    const user = await User.findOne({email:email});
    let appointments=[];
    if(filterDate){
        appointments = await Appointment.find({user:user, date:filterDate});
    }else{
        appointments = await Appointment.find({user:user});
    }

    return appointments;
}

const updateAppointment = async (id, email, editReq) =>{
    const user = await User.findOne({email:email});
    const originalAppointment = await Appointment.findOne({_id:id,user});
    const editedAppointment = {...editReq, user: originalAppointment.user};
    const appointment = await Appointment.findByIdAndUpdate(
        id, 
        editedAppointment, 
        { new: true, runValidators: true }
    );

    return appointment;
}

export {createAppointment, getAppointments, updateAppointment};