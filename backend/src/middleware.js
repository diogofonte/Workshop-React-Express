const { StatusCodes } = require('http-status-codes');
const DataStore = require('./datastore');

const isExistingItem = async (req, res, next) => {
    const { key } = req.params;
    // TODO 6: Finish implementing this middleware
    const item = DataStore.getByKey(key);
    if (item == null) {
        res.status(StatusCodes.BAD_REQUEST).send('Item not found');
        return;
    }
    return next();
}

module.exports = {
    isExistingItem,
}
