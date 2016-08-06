var express = require('express');
var router = express.Router();
var Device = require('../models/device');

router.route('/devices')
    .post(function(req, res) {

      console.log("postDevices")
      var device = new Device();      // create a new instance of the Device model
      device.name = req.body.name;
      device.type = req.body.type;
      device.ip = req.body.ip;
      device.owner = req.sessionID;
      device.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Device created!' });
      });

    })
    .get(function(req, res) {
        console.log("getDevices")
        Device.find({owner: req.sessionID},function(err, devices) {
            if (err)
                res.send(err);

            res.json(devices);
        });
    });

router.route('/devices/:device_id')
    .get(function(req, res) {
        Device.findById(req.params.device_id, function(err, device) {
            if (err)
                res.send(err);
            if( device.owner === req.sessionID)
                res.json(device);
            else {
                req.json({error: "User not allow"})
            }
        });
    })
    .put(function(req, res) {
        Device.findById(req.params.device_id, function(err, device) {
            if (err)
                res.send(err);
            if( device.owner === req.sessionID) {

                device.name = req.body.name;
                device.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'Device updated!'});
                });
            } else {
                req.json({error: "User not allow"})
            }
        });
    })
    .delete(function(req, res) {
        Device.remove({
            _id: req.params.device_id
        }, function(err, device) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



module.exports = router;
