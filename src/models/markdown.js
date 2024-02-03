'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        static associate(models) {
            // define association here
        }
    }
    Markdown.init({
        contentHTML: DataTypes.TEXT,
        contentMarkdown: DataTypes.STRING,
        description: DataTypes.TEXT,
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};