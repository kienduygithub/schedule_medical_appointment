'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        static associate(models) {
            Allcode.hasMany(models.User, {
                foreignKey: 'positionId', as: 'positionData'
            }),
                Allcode.hasMany(models.User, {
                    foreignKey: 'gender', as: 'genderData'
                })
        }
    }
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVn: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};
