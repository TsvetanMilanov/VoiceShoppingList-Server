'use strict';
let mongoose = require('mongoose'),
  constants = require('./../../common/constants');

module.exports = function() {
  let schema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
      unique: true,
      minLength: constants.MIN_USERNAME_LENGTH,
      maxLength: constants.MAX_USERNAME_LENGTH
    },
    password: {
      type: String,
      required: true
    },
    shoppingLists: {
      type: [{
        sqliteId: Number,
        name: String,
        createdOn: String,
        products: [{
          name: String,
          price: Number,
          shoppingListId: Number,
          isChecked: Boolean,
          _ID: Number
        }]
      }]
    },
    registrationDate: {
      type: Date,
      required: true,
      default: new Date()
    },
    isBanned: {
      type: Boolean,
      required: true,
      default: false
    },
    roles: {
      type: [String],
      required: true,
      default: [constants.USER_ROLE]
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    token: {
      type: String
    }
  });

  mongoose.model('User', schema);
};
