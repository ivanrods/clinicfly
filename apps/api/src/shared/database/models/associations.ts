import Patient from './patient';
import Doctor from './doctor';
import Appointment from './appointment';

Patient.hasMany(Appointment, {
  foreignKey: 'patientId',
  as: 'appointments',
});

Appointment.belongsTo(Patient, {
  foreignKey: 'patientId',
  as: 'patient',
});

Doctor.hasMany(Appointment, {
  foreignKey: 'doctorId',
  as: 'appointments',
});

Appointment.belongsTo(Doctor, {
  foreignKey: 'doctorId',
  as: 'doctor',
});
