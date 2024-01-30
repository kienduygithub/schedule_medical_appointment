import express from 'express';
import homeController from '../controllers/homeController'
const router = express.Router();

const configWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.getDataCRUD)
    router.get('/delete-crud/:id', homeController.deleteCRUD)
    return app.use('/api', router);
}

module.exports = configWebRoutes;