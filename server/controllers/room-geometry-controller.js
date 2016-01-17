'use strict';
let RoomGeometry = require('mongoose').model('RoomGeometry');

module.exports = {
    getAll: function(req, res) {
        RoomGeometry.find({})
            .then(function(result) {
                res.json(result);
            });
    },
    createRoomGeometry: function(req, res) {
        let roomGeometry = req.body;
        roomGeometry.Author = req.user._id;

        let room = new RoomGeometry(roomGeometry);

        room.save()
            .then(function(result) {
                res.json(result);
            }, function(err) {
                res.json(err);
            });
    },
    getById: function(req, res) {
        let id = req.params.id;

        RoomGeometry.findOne({
                _id: id
            })
            .then(function(result) {
                res.json(result);
            }, function(err) {
                res.json(err);
            });
    },
    getMine: function(req, res) {
        let userId = req.user._id;

        RoomGeometry.find({
                Author: userId
            })
            .then(function(result) {
                res.json(result);
            }, function(err) {
                res.json(err);
            });
    }
};
