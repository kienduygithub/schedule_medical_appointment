import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController'
const router = express.Router();

const configWebRoutes = (app) => {
    // HOME PAGE
    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.getDataCRUD)
    router.get('/delete-crud/:id', homeController.deleteCRUD)
    // USER CLIENT
    router.post('/sign-in', userController.loginUser)
    router.post('/get-all-users', userController.getAllUsers)
    router.post('/create-new-user', userController.createNewUser)
    router.put('/edit-user', userController.editUser)
    router.delete('/delete-user', userController.deleteUser)

    // ROLE ALLCODES
    router.get('/allcodes/:type', userController.getAllCodes)

    // DOCTOR
    router.get('/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/get-all-doctors', doctorController.getAllDocters)
    router.post('/save-info-doctors', doctorController.postInfoDoctor)
    return app.use('/api', router);
}

module.exports = configWebRoutes;