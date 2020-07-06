let errorHandler = (err, req, res, next) =>{
    res.send("Some Error Occurred at Global Level");
}

let notFoundHandler = (req, res, next) =>{
    res.status(400).send("Routes not found in the application");
}

module.exports = {
    globalErrorHandler : errorHandler,
    globalNotFoundHandler : notFoundHandler
    
}