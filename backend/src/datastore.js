class DataStore {
    constructor() {
	    this.database = {};
    }

    getAll() {
        return Object.values(this.database);
    }

    getAllKeys() {
	    return Object.keys(this.database);
    }

    getByKey(key) {
	    return this.database[key];
    }

    putByKey(key, data) {
	    this.database[key] = data;
    }

    deleteByKey(key) {
	    delete this.database[key];
    }
}

module.exports = new DataStore();
