'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('markdowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentHTML: {
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT('long')
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            specialtyId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            clinicId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('markdowns');
    }
};