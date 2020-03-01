require('dotenv').config();

// Module dependencies
const winston = require('winston'),
mongoose = require('mongoose');


//const connectionString = 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME;
 const connectionString = 'mongodb+srv://aban:aban123@cluster0-bexd6.mongodb.net/test?retryWrites=true&w=majority';
const transport = new winston.transports.File({ filename: 'logfile.log' });
const logger = winston.createLogger({
    transports: [transport]
});

let connection = null;

class Database {
    open() {
        const options = {
            useCreateIndex: true,
            useNewUrlParser: true
        };
        mongoose.connect(connectionString, options, (err) => {
            if (err) logger.info('mongoose.connect() failed: ' + err);
        });
        connection = mongoose.connection;
        mongoose.Promise = global.Promise;

        mongoose.connection.on('error', (err) => {
            logger.info('Error connecting to MongoDB: ' + err);
            //callback(err, false);
        });

        mongoose.connection.once('open', () => {
            logger.info('We have connected to mongodb');
            //callback(null, true);
        });
    }

    // disconnect from database
    close() {
        connection.close(() => {
            logger.info('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    }

}

module.exports = new Database();
