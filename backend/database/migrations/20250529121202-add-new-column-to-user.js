'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING,
      allowNull: true, // or false, depending on your needs
    });

    await queryInterface.addColumn('Users', 'sex', {
      type: Sequelize.STRING,
      allowNull: true, // or false, depending on your needs
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('Users', 'phone');
    await queryInterface.removeColumn('Users', 'sex');
  }
};
