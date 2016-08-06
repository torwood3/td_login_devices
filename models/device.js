/**
 * Created by snaps on 02/08/2016.
 */

var mongoose = require('mongoose');

var DeviceSchema   = new mongoose.Schema({
    name: String,
    owner: String,
    type: String,
    quantity: Number,
    ip: String
});

module.exports = mongoose.model('Device', DeviceSchema);
