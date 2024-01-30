import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import configViewEngine from './config/viewEngine'
import configWebRoutes from './route/web'
import initConnectDB from './config/configDB'
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: '*',
    methods: [ 'GET', 'POST', 'PUT', 'DELETE' ]
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// CONFIG SERVER
configViewEngine(app);
configWebRoutes(app);
initConnectDB();
app.listen(port, () => {
    console.log(`>>> Welcome to http://localhost:${ port }`);
})
// const instance = axios.create({
//     baseURL: process.env.REACT_APP_BACKEND_URL
// })