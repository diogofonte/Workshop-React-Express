const express = require('express');
const { StatusCodes } = require('http-status-codes');
const DataStore = require('./datastore');
const { isExistingItem } = require('./middleware');
const validators = require('./validators');
const app = express();
const port = 8080;

// JSON bodyparser (parses JSON request body into req.body)
app.use(express.json());

// Adding headers (CORS)
// NOTE: Allowing all origins is not the best practice but it's done here for ease of development
app.use((_, res, next) => {
    // Allow connections for all origins
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Allowed request methods
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    // Allowed request headers
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, authorization");
    // Continue to next layer of middleware
    return next();
});

app.get('/', (req, res) => res.json({ hello: "world!" }));

app.get('/todo', (req, res) => {
    return res.status(StatusCodes.OK).json(DataStore.getAll());
});

// TODO 7: Add route to get a specific item
app.get('/todo/:key', isExistingItem, (req, res) => {
    return res.status(StatusCodes.OK).json(DataStore.getByKey(req.params.key));
});

app.post('/todo', validators.createItem, (req, res) => {
    DataStore.putByKey(req.body.key, req.body);
    return res.status(StatusCodes.OK).json({});
});

app.put('/todo/:key/archive', isExistingItem, (req, res) => {
    const val = DataStore.getByKey(req.params.key);
    val.state = "DONE";
    return res.status(StatusCodes.OK).json({});
});

app.put('/todo/:key/unarchive', isExistingItem, (req, res) => {
    const val = DataStore.getByKey(req.params.key);
    val.state = "TODO";
    return res.status(StatusCodes.OK).json({});
});

app.delete('/todo/:key', isExistingItem, (req, res) => {
    DataStore.deleteByKey(req.params.key);
    return res.status(StatusCodes.OK).json({});
});

app.listen(port, () => {
    console.log(`TODO app listening at http://localhost:${port}`);
});

// TODO 6: Add isExistingItem middleware to the existing routes