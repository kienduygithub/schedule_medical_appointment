'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up( queryInterface, Sequelize ) {
        return queryInterface.bulkInsert( 'users', [ {
            email: 'admin@gmail.com',
            password: '123',
            firstName: 'Duy',
            lastName: 'Admin',
            address: 'Hòa Bình',
            gender: 1,
            roleId: 'R1',
            phonenumber: '083111111',
            createdAt: new Date(),
            updatedAt: new Date()
        } ] );
    },

    async down( queryInterface, Sequelize ) {
        await queryInterface.dropTable( 'users' );
    }
};
