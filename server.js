const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

// error handling
app.use( function(req, res, next) {
    res.status(404).send('Not found');
});

app.use( function(req, res, next) {
    console.error(err.stack);  // for server, includes stack trace for debugging
    res.status(500).send('Server error');  // for client
});

const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port ', server.address().port);
});
