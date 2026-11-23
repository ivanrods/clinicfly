/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'patients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'doctors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      date: { type: Sequelize.DATEONLY, allowNull: false },
      startTime: { type: Sequelize.TIME, allowNull: false },
      endTime: { type: Sequelize.TIME, allowNull: false },
      status: {
        type: Sequelize.ENUM(
          'scheduled',
          'confirmed',
          'completed',
          'cancelled',
        ),
        allowNull: false,
        defaultValue: 'scheduled',
      },
      reason: { type: Sequelize.TEXT, allowNull: true },
      notes: { type: Sequelize.TEXT, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.addIndex(
      'appointments',
      ['doctorId', 'date', 'startTime'],
      { name: 'appointments_doctor_date_start_time_idx' },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('appointments');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_appointments_status";',
    );
  },
};
