import express from 'express';
import Appointment from '../models/appointment.js';
import { createAppointment, getAppointments, updateAppointment } from '../services/appointments.js';

const router = express.Router();

router.post('/appointments', async (req, res) => {
    try {
      const appointmentReq = req.body;
      const {email} = req.user;
      await createAppointment(email,appointmentReq);
      res.status(201).send();
    } catch (error) {
      res.status(400).send(error);
    }
  });

router.get('/appointments', async (req, res) => {
    try {
        const {email} = req.user;
        const filterDate = req.query.filterDate;
        const appointments = await getAppointments(email,filterDate);
        res.status(200).send(appointments);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/appointments/:id', async (req, res) => {
    try {
        const {email} = req.user;
        const editReq = req.body;
        const appointment = await updateAppointment(req.params.id, email, editReq);
        if (!appointment) {
        return res.status(404).send();
        }
        res.status(200).send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
        return res.status(404).send();
        }
        res.status(200).send(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;