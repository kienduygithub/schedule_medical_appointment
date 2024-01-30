const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('schedule_medical_appointment', 'root', null, {
    host: 'localhost',
    dialect: "mysql",
    logging: false,
    timezone: '+07:00'
});

const initConnectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to schedule_medical_appointment');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default initConnectDB