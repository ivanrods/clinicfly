import sequelize from '../../config/database';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import type { NonAttribute } from 'sequelize';
import {
  APPOINTMENT_STATUSES,
  type AppointmentStatus,
} from '../../../modules/appointments/dto/create-appointment-dto';
import type Doctor from './doctor';
import type Patient from './patient';

class Appointment extends Model<
  InferAttributes<Appointment>,
  InferCreationAttributes<Appointment>
> {
  declare id: CreationOptional<number>;
  declare patientId: number;
  declare doctorId: number;
  declare date: string;
  declare startTime: string;
  declare endTime: string;
  declare status: CreationOptional<AppointmentStatus>;
  declare reason: string | null;
  declare notes: string | null;
  declare patient?: NonAttribute<Patient>;
  declare doctor?: NonAttribute<Doctor>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Appointment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'patients', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'doctors', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },
    status: {
      type: DataTypes.ENUM(...APPOINTMENT_STATUSES),
      allowNull: false,
      defaultValue: 'scheduled',
    },
    reason: { type: DataTypes.TEXT, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    timestamps: true,
  },
);

export default Appointment;
