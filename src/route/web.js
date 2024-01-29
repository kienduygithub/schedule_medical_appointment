import express from 'express';
import homeController from '../controllers/homeController'
const router = express.Router();

const configWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    return app.use('/api', router);
}

module.exports = configWebRoutes;