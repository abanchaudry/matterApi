const winston = require('winston');
const express = require('express');
const app = express();


require('./startup/swaggerDoc')(app);
require('./startup/logging')();
db = require('./startup/db');
require('./startup/config');
require('./startup/validation')();

require('./routes/routes')(app);

db.open();
// const db = mongojs(`mongodb+srv://abanusama:<jnmjwGzut43DEMe>@aphcluster-ixovz.mongodb.net/test?retryWrites=true&w=majority`);
// db.on('error', function (err) {
//   console.log('database error', err);
// });

// db.on('connect', function () {
//   console.log('database connected');
// });
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

// mongodb+srv://abanusama:<jnmjwGzut43DEMe>@aphcluster-ixovz.mongodb.net/test?retryWrites=true&w=majority