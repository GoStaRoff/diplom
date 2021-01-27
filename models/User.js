const {Schema, model, Types} = require('mongoose');
const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    login: {type: String, required: true, default: "newUser"},
    userType: {type: String, required: true, default: "user"},
    testHistory: {type: Array},
    links: [{type: Types.ObjectId, ref: 'Link'}]
});

module.exports = model('User', schema);