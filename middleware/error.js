const winston = require('winston');

const { format } = winston;
const {combine, prettyPrint,  errors, metadata} = format;

module.exports = (err, req, res, next) => {
    /// to-do:: log the error to a file
    const logger = winston.createLogger({
        level: 'error',
        format: combine(
            errors({stack: true}),
            prettyPrint(),
            metadata(),
        ),
        transports: [
            // this is to enable save error messages to flat file
            new winston.transports.File({filename: 'Errors.log', options: {flags: 'w'}})

        ]
    });

    // also consoling out the error if it is not in production
    if(process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }

    logger.error(err); // this logs the error to the flat file

    return res.status(500).send({
        message: 'Something went wrong!',
        status: 'error',
        data: null
    });
};