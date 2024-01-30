import express from 'express';
import homeController from '../controllers/homeController'
import userController from '../controllers/userController';
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
    return app.use('/api', router);
}

module.exports = configWebRoutes;