import express from 'express';

const setViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
}

module.exports = setViewEngine;