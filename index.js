const express = require('express')
const appConfig = require('./config/appConfig');
const fs = require('fs');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require ('body-parser');
const globalErrorMiddleware = require('./middlewares/appErrorHandler');
const routeLoggerMiddleware = require('./middlewares/routeLogger')  
const app = express()

app.use(body-bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(cookieParser());
app.use(globalErrorMiddleware.globalErrorHandler);
app.use(routeLoggerMiddleware.logIp);

let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function(file){
    if(~file.indexOf('.js')) require (modelsPath+'/'+file)
});

let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function(file){
    if(~file.indexOf('.js')){
        let route = require(routesPath+'/'+file);
        route.setRouter(app);
    }
});


app.use(globalErrorMiddleware.globalNotFoundHandler)


app.listen(port, () => {

console.log(`Example app listening at http://localhost:${port}`);
let db = mongoose.connect(appConfig.db.uri, {usemongooseClient:true});

})

mongoose.connection.on('error', function(err){
    console.log(err);
})

mongoose.connection.on('open', function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('Database connection open Success');
    }
    
});

