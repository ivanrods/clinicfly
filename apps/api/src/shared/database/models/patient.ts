import sequelize from '../../config/database';
import { DataTypes, Model } from 'sequelize';

class Patient extends Model {
  declare id: number;
  declare name: string;
  declare cpf: string;
  declare birthDate: string;
  declare gender: 'male' | 'female' | 'other';
  declare phone: string | null;
  declare email: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Patient.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
    birthDate: { type: DataTypes.DATEONLY, allowNull: false },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false,
    },
    phone: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: 'Patient',
    tableName: 'patients',
    timestamps: true,
  },
);

export default Patient;
