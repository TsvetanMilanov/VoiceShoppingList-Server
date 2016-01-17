'use strict';
let mongoose = require('mongoose');

module.exports = function() {
    let schema = new mongoose.Schema({
        Room: {
            Edges: [{
                ZRotation: Number,
                ProjectedHeight: Number
            }],
            ProjectedReferenceHeight: Number,
            ActualReferenceHeight: Number,
            Longitude: Number,
            Latitude: Number
        },
        Geometry: {
            Distances: [Number],
            Yaws: [Number],
            ActualWallsSizes: [Number]
        },
        Author: {
            type: String
        }
    });

    mongoose.model('RoomGeometry', schema);
};
