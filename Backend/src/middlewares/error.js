export const errorHandler = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000 || err.code === 11001 || err.code === "E11000") {
        const fieldName = err.message.split('index: ')[1].split(' dup key')[0].split('_')[0];
        console.log(err)
        err.message = `${fieldName} is already registered`
        err.statusCode = 409;
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        statusCode: err.statusCode,
    })
}
